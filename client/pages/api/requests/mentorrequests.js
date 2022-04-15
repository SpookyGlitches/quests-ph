import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getAllMentorRequests(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }
  const { user } = await getSession({ req });
  try {
    const getRequests = await prisma.questMentorshipRequest.findMany({
      where: {
        mentorId: user.userId,
        status: "ACTIVE",
        updatedAt: null,
        deletedAt: null,
      },
      include: {
        partyLeader: {
          select: {
            displayName: true,
            fullName: true,
          },
        },
        mentor: {
          select: { displayName: true },
        },
        quest: {
          select: { wish: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(getRequests);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
