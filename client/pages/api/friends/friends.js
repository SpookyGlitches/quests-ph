import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getAllFriends(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });
    const friendsRequest = await prisma.friendship.findMany({
      where: {
        OR: [
          {
            userOneId: user.userId,
          },
          {
            userTwoId: user.userId,
          },
        ],
        deletedAt: null,
      },
      include: {
        userOne: {
          select: {
            userId: true,
            displayName: true,
            fullName: true,
            image: true,
          },
        },
        userTwo: {
          select: {
            userId: true,
            displayName: true,
            fullName: true,
            image: true,
          },
        },
      },
    });
    return res.status(200).json(friendsRequest);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
