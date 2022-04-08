import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

export default async function GetFriendships(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });
    const param = req.query.userId;

    const checkFriendship = await prisma.friendship.findMany({
      where: {
        OR: [
          {
            userOneId: user.userId,
            userTwoId: param,
          },
          {
            userOneId: param,
            userTwoId: user.userId,
          },
        ],
        deletedAt: null,
      },
    });
    return res.status(200).json(checkFriendship);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
