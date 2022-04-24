import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getAllFriendsSuggestion(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });

    const userIDS = await prisma.friendship.findMany({});

    const filterUserOne = userIDS.map((x) => x.userOneId);
    const filterUserTwo = userIDS.map((x) => x.userTwoId);

    // const getUserOneID = filterUserOne.filter(
    //   (x) => x.userOneId === user.userId,
    // );
    const storeUserID = [];

    for (let x = 0; x < filterUserOne.length; x++) {
      if (filterUserOne[x] !== "cl2a4k83j0010iairt1i5qezo") {
        storeUserID.push(filterUserOne[x]);
      }
    }

    for (let x = 0; x < filterUserTwo.length; x++) {
      if (filterUserTwo[x] !== "cl2a4k83j0010iairt1i5qezo") {
        storeUserID.push(filterUserTwo[x]);
      }
    }

    const getAllUserId =
      await prisma.$queryRaw`select userId from User WHERE userId <> "cl2a4k83j0010iairt1i5qezo" `;

    console.log(getAllUserId);

    //   const allUser = await prisma.user.findMany({
    //     take: 5,
    //     where: {
    //       friendship: {
    //         none: {
    //           userId: user.userId,
    //         },
    //       },
    //       deletedAt: null,
    //       questId: Number(req.query.questId),
    //     },
    //     orderBy: { createdAt: "desc" },
    //   });

    //   return res.status(200).json({ member: memberId, tasks: returnAllTask });
  } catch (error) {
    console.log(error);
  }
  return res.status(400).json({ message: "Something went wrong" });
}
