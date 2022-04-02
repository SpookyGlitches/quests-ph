import prisma from "../../../../../lib/prisma";
import { getSession } from "next-auth/react";

async function getAllTasks(req, res) {
  try {
    const returnAllTask = await prisma.questTask.findMany({
      where: {
        questTaskFinisher: {
          none: {},
        },

        deletedAt: null,
        questId: req.query.questTaskid,
      },
    });

    return res.status(200).json(returnAllTask);
  } catch (error) {
    console.log(error);
  }
  return res.status(400).json({ message: "Something went wrong" });
}

async function taskFinisher(req, res) {
  const { user } = await getSession({ req });
  try {
    const { points, questTaskid } = req.body;

    const finisher = await prisma.questTaskFinisher.create({
      data: {
        questId: Number(req.query.questId),
        questTaskid: questTaskid,
        userId: user.userId,
        gainedPoints: points,
      },
    });
    return res.status(200).json(finisher);
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

// prisma.questTaskFinisher.findUnique({
//   where: {
//     userId: user.userId, //current user
//   },
// });

// prisma.questTask.findMany({
//   where: {
//     questTaskFinisher: {
//       some: {},
//     },
//   },
// });
