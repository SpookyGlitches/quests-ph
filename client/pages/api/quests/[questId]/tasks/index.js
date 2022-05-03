import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

async function getAllTasks(req, res) {
  // batch queries here to insert to questTaskFinisher and insert to PointsLog

  try {
    const { user } = await getSession({ req });

    const [memberId, returnAllTask] = await prisma.$transaction([
      prisma.$queryRaw`SELECT partyMemberId FROM PartyMember WHERE userId = ${user.userId} AND questId = ${req.query.questId};`,

      prisma.questTask.findMany({
        take: 3,
        where: {
          questTaskFinisher: {
            none: {
              userId: user.userId,
            },
          },
          deletedAt: null,
          questId: Number(req.query.questId),
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return res.status(200).json({ member: memberId, tasks: returnAllTask });
  } catch (error) {
    console.log(error);
  }
  return res.status(400).json({ message: "Something went wrong" });
}

async function taskFinisher(req, res) {
  const { user } = await getSession({ req });
  try {
    const { points, questTaskid, memberId } = req.body;

    console.log(req.body);
    // batch queriers insert into two tables

    // get all the points from Quest Task

    // deduct poitns
    // function deductPoints(date){
    //   if(date > )
    // }

    const [finisher, pointsLog] = await prisma.$transaction([
      prisma.questTaskFinisher.create({
        data: {
          questId: Number(req.query.questId),
          questTaskid,
          userId: user.userId,
          gainedPoints: points,
        },
      }),
      prisma.pointsLog.create({
        data: {
          partyMemberId: memberId,
          gainedPoints: points,
          action: "COMPLETED_TASK",
        },
      }),
    ]);

    return res.status(200).json({ finisher, pointsLog });
  } catch (err) {
    console.log(err);
  }
  return res.status(404).json({ message: "error request" });
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    await getAllTasks(req, res);
  } else if (req.method === "POST") {
    await taskFinisher(req, res);
  }
}
