import prisma from "../../../lib/prisma";

export default async function removeFriendRequests(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const removeFriendRequest = await prisma.friendRequest.update({
      where: {
        friendRequestId: req.body.friendRequestId,
      },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        deletedAt: new Date(),
      },
    });
    return res.status(200).json(removeFriendRequest);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
