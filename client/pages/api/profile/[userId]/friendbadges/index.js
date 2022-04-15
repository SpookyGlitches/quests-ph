import prisma from "../../../../../lib/prisma";

export default async function getFriendBadges(req, res) {
  const returnArray = [];
  if (req.method === "GET") {
    try {
      // find badges of the user
      const getBadges = await prisma.userBadge.findMany({
        where: {
          userId: req.query.userId,
          deletedAt: null,
        },
      });
      // find badge depending on getBadges.badgeId
      if (getBadges) {
        for (let i = 0; i < getBadges.length; i++) {
          // eslint-disable-next-line
          const badgeInfo = await prisma.badge.findFirst({
            where: {
              badgeId: getBadges[i].badgeId,
            },
            orderBy: {
              badgeId: "asc",
            },
          });
          if (badgeInfo) {
            returnArray.push(badgeInfo);
          }
        }
      }

      return res.status(200).json(returnArray);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    return res.status(404).json({ message: "Method not allowed " });
  }
}
