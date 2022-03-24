import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function getAllOutgoing(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });
    const outgoingRequest = await prisma.friendRequest.findMany({
      where: {
        requesterId: user.userId,
        completedAt: null,
        deletedAt: null,
      },
      include: {
        requestee: { select: { displayName: true, fullName: true } },
      },
    });
    return res.status(200).json(outgoingRequest);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
