import prisma from "../../../../../lib/prisma";

export default async function getFriendBadgesPopper(req, res) {
  const retVal = [];
  if (req.method === "GET") {
    try {
      const getBadges = await prisma.badge.findFirst({
        where: {
          name: req.query.name,
        },
      });
      if (getBadges) {
        retVal.push(getBadges.description);
        const getMyBadges = await prisma.userBadge.findFirst({
          where: {
            badgeId: getBadges.badgeId,
          },
        });
        retVal.push(getMyBadges.createdAt);
      }
      return res.status(200).json(retVal);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    return res.status(404).json({ message: "Method not allowed " });
  }
}
