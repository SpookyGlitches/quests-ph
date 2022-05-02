import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
// eslint-disable-next-line
export default async function (req, res) {
  const { user } = await getSession({ req });
  if (req.method === "POST") {
    const addFriend = await prisma.friendRequest.create({
      data: {
        requesterId: user.userId,
        requesteeId: req.body.userId,
      },
    });
    /* eslint-disable */
    const insertFriendReq = await prisma.Notification.create({
      data: {
        userId: req.body.userId,
        message: "sent you a friend request",
        type: "FRIEND_REQUEST",
        metadata: JSON.stringify({
          friendRequestId: addFriend.friendRequestId,
        }),
      },
    });

    res.status(200).json(addFriend);
  }

  await prisma.$disconnect();
}
