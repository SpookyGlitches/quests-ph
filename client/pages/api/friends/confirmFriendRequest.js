import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function confirmFriendRequests(req, res) {
  const { user } = await getSession({ req });
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const confirmFriendRequest = await prisma.friendRequest.update({
      where: {
        friendRequestId: req.body.friendRequestId,
      },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },
    });
    let returnValue = confirmFriendRequest;
    if (confirmFriendRequest) {
      // const newFriendship = await prisma.friendship.create({
      //   data: {
      //     userOneId: req.body.requesterId,
      //     userTwoId: req.body.requesteeId,
      //     createdAt: new Date(),
      //   },
      // });

      const [newFriendship, /* eslint-disable */ insertNotifData] =
        await prisma.$transaction([
          prisma.friendship.create({
            data: {
              userOneId: req.body.requesterId,
              userTwoId: req.body.requesteeId,
              createdAt: new Date(),
            },
          }),
          prisma.notification.create({
            data: {
              userId: req.body.requesterId,
              type: "ACCEPT_FRIEND_REQUEST",
              message: "accepted your friend request.",
              metadata: JSON.stringify({ userId: user.userId }),
            },
          }),
        ]);
      returnValue = newFriendship;
      console.log(returnValue);
    } else {
      res.status(400).json({ message: "Could not confirm friend request" });
    }
    return res.status(200).json(returnValue);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
