import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getAllIncoming(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });
    const incomingRequest = await prisma.friendRequest.findMany({
      where: {
        requesteeId: user.userId,
        completedAt: null,
        deletedAt: null,
      },
      include: {
        requester: {
          select: { displayName: true, fullName: true, image: true },
        },
      },
    });
    return res.status(200).json(incomingRequest);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
}
