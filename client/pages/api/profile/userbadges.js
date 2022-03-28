import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getAllFriends(req, res) {
  const returnArray = [];
  if (req.method === "GET") {
    try {
      const { user } = await getSession({ req });
      // console.log(user.displayName);
      // find badges of the user
      const getBadges = await prisma.userBadge.findMany({
        where: {
          userId: user.userId,
        },
      });
      // find badge depending on getBadges.badgeId
      // console.log(getBadges[2].badgeId);
      if (getBadges) {
        for (let i = 0; i < getBadges.length; i++) {
          const badgeInfo = prisma.badge.findFirst({
            where: {
              badgeId: getBadges[i].badgeId,
            },
          });
          if (badgeInfo) {
            returnArray.push(badgeInfo);
            // console.log(badgeInfo);
          }
        }
      }
      //   console.log("aloha");
      //   console.log(returnArray);
      return res.status(200).json(returnArray);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    return res.status(404).json({ message: "Method not allowed " });
  }
}
