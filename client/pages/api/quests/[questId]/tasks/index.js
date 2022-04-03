import prisma from "../../../../../lib/prisma";
import { getSession } from "next-auth/react";

async function getAllTasks(req, res) {
  //batch queries here to insert to questTaskFinisher and insert to PointsLog

  try {
    const { user } = await getSession({ req });

    const questTaskid = req.query.questTaskid;
    const userId = user.userId;
    const [memberId, returnAllTask] = await prisma.$transaction([
      prisma.$queryRaw`SELECT partyMemberId FROM PartyMember WHERE userId = ${user.userId};`,
      // prisma.$queryRaw`SELECT qt.questTaskid,  u.userId,  qt.questId, qt.title, qt.points ,qt.description, qt.dueAt, qt.deletedAt
      // FROM QuestTask AS qt
      // INNER JOIN QuestTaskFinisher AS qtf
      // ON qtf.questTaskid = qt.questTaskid
      // INNER JOIN User AS u
      // ON qtf.userId = u.userId
      // WHERE qtf.userId = ${user.userId} AND qtf.questTaskid = qt.questTaskid AND qt.questId = ${req.query.questId} AND qt.questTaskid = qtf.questTaskid; `,
      /* 

    // GOAL IS TO RETURN ALL TASKS WHICH USER ID HAS NO ENTRY YET ON QUEST TASK FINISHER 
      1. Check userId and questTaskId on QuestTaskFinisher 
      2. if both userid equal to current userid and questTaskid is present in questTaskfinsher table then do not return the task with that questTaskid 

      
        */

      prisma.questTask.findMany({
        where: {
          questTaskFinisher: {
            none: {},
          },
          deletedAt: null,
          questId: Number(req.query.questId),
        },
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

    //batch queriers insert into two tables

    const [finisher, pointsLog] = await prisma.$transaction([
      prisma.questTaskFinisher.create({
        data: {
          questId: Number(req.query.questId),
          questTaskid: questTaskid,
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

// async function getUnfinishedTask(req, res) {
//   const { user } = await getSession({ req });

//   res.status(200).json(user.userId);
// }

export default async function handler(req, res) {
  if (req.method === "GET") {
    await getAllTasks(req, res);
  } else if (req.method === "POST") {
    await taskFinisher(req, res);
  }
}
