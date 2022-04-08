import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

export default async function checkFriendReqs(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });
    const param = req.query.userId;
    const outgoingRequest = await prisma.friendRequest.findMany({
      where: {
        OR: [
          {
            requesterId: user.userId,
            requesteeId: param,
            completedAt: null,
          },
          {
            requesterId: param,
            requesteeId: user.userId,
            completedAt: null,
          },
        ],
      },
    });
    return res.status(200).json(outgoingRequest);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
