import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

export default async function checkFriendReqs(req, res) {
  const prisma = new PrismaClient();
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });

    const getAllUserId =
      await prisma.$queryRaw`select * from User WHERE userId <> ${user.userId} AND role <> "admin"`;

    const parseIDs = getAllUserId.map((x) => x.userId);

    const results = [];
    const userNotFriend = [];

    if (parseIDs) {
      for (let x = 0; x < parseIDs.length; x++) {
        /* eslint-disable */
        const checkFriendship = await prisma.Friendship.findFirst({
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
      }
    } else {
      console.log("no user ids found");
    }

    const returnAllUser = await prisma.User.findMany({
      take: 5,
      where: {
        userId: {
          in: userNotFriend,
        },
      },
      select: {
        userId: true,
        displayName: true,
        fullName: true,
      },
    });

    await prisma.$disconnect();

    return res.status(200).json(returnAllUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
