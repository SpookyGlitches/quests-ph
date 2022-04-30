import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

export default async function checkFriendReqs(req, res) {
  const prisma = new PrismaClient();
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });

    console.log(user.userId);
    const getAllUserId =
      await prisma.$queryRaw`select * from user WHERE userId <> ${user.userId} AND role <> "admin"`;

    const parseIDs = getAllUserId.map((x) => x.userId);

    console.log(parseIDs);

    const results = [];
    const userNotFriend = [];

    if (parseIDs) {
      // console.log(parseIDs.length);
      for (let x = 0; x < parseIDs.length; x++) {
        /* eslint-disable */
        const checkFriendship = await prisma.friendship.findFirst({
          where: {
            OR: [
              {
                userOneId: user.userId,
                userTwoId: parseIDs[x],
                deletedAt: null,
              },
              {
                userOneId: parseIDs[x],
                userTwoId: user.userId,
                deletedAt: null,
              },
            ],
          },
        });

        if (checkFriendship) {
          results.push(checkFriendship);
        } else {
          userNotFriend.push(parseIDs[x]);
        }
        prisma.$disconnect();
      }
    } else {
      console.log("no user ids found");
    }

    // console.log("NOT YET FRIENDS\n");
    // console.log(userNotFriend);

    const returnUser = [];

    for (let x = 0; x < userNotFriend.length; x++) {
      /* eslint-disable */
      const returnAllUser = await prisma.user.findFirst({
        take: 2,
        where: {
          userId: userNotFriend[x],
        },
      });
      returnUser.push(returnAllUser);
      prisma.$disconnect();
    }

    return res.status(200).json(returnUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
