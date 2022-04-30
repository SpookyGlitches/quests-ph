import { getSession } from "next-auth/react";
import { Prisma, PrismaClient } from "@prisma/client";
// eslint-disable-next-line
export default async function (req, res) {
  const prisma = new PrismaClient();
  console.log(req.query.friendRequestId);
  if (req.method === "GET") {
    // const checkRequest = await prisma.friendRequest.findFirst({
    //   where: {
    //     friendRequestId: req.query.friendRequestId,
    //   },
    //   include: {
    //     requester: {
    //       select: {
    //         userId: true,
    //         displayName: true,
    //       },
    //     },
    //   },
    // });

    const checkRequest =
      await prisma.$queryRaw`select f.friendRequestId, f.requesterId, f.status, f.completedAt, f.deletedAt, u.userId, u.displayName, u.image
      FROM friendRequest AS f
      INNER JOIN User AS u ON f.requesterId = u.userId
      WHERE f.friendRequestId = ${req.query.friendRequestId}`;

    await prisma.$disconnect();
    res.status(200).json(checkRequest);
  }
}
