import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
// eslint-disable-next-line
export default async function (req, res) {
  if (req.method === "POST") {
    const { user } = await getSession({ req });
    const createFriendReq = await prisma.friendRequest.create({
      data: {
        requesterId: user.userId,
        requesteeId: req.body.userId,
      },
    });

    res.status(200).send(createFriendReq);
  }

  await prisma.$disconnect();
}
