import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function deleteFriend(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const deleteFriend = await prisma.friendship.update({
      where: {
        friendshipId: req.body.friendshipId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return res.status(200).json(deleteFriend);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
