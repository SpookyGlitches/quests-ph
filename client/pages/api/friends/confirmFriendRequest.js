import prisma from "../../../lib/prisma";

export default async function confirmFriendRequest(req, res) {
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
      const newFriendship = await prisma.friendship.create({
        data: {
          userOneId: req.body.requesterId,
          userTwoId: req.body.requesteeId,
          createdAt: new Date(),
        },
      });
      returnValue = newFriendship;
    } else {
      res.status(400).json({ message: "Could not confirm friend request" });
    }
    return res.status(200).json(returnValue);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
