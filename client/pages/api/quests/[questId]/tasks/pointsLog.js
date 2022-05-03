// import { prisma } from "../../../../../lib/prisma";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

export default async function pointsLogHandler(req, res) {
  if (req.method !== "GET") {
    return res.status(400).send("Method not allowed");
  }

  try {
    const { user } = await getSession({ req });
    const member =
      // await prisma.$queryRaw`SELECT partyMemberId FROM PartyMember WHERE userId = ${user.userId} AND questId = ${req.query.questId}`;

      await prisma.partyMember.findFirst({
        where: {
          userId: user.userId,
          questId: Number(req.query.questId),
        },
      });

    const pointsLog = await prisma.pointsLog.findMany({
      where: {
        partyMemberId: member.partyMemberId,
      },
      orderBy: { createdAt: "desc" },
    });

    await prisma.$disconnect();
    return res.status(200).send(pointsLog);
  } catch (error) {
    console.log(error);
    return res.status(400).send();
  }
}
