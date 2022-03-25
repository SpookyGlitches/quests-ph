import prisma from "../../../../../lib/prisma";
import { getSession } from "next-auth/react";

async function getAllTasks(req, res) {
  try {
    const tasks = await prisma.questTask.findMany({
      where: {
        questId: Number(req.query.questId),
        deletedAt: null,
      },
    });
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
  return res.status(400).json({ message: "Something went wrong" });
}

async function taskFinisher(req, res) {
  const { user } = await getSession({ req });

  // const { questTaskId, points } = req.body;

  try {
    const finisher = await prisma.questTaskFinisher.create({
      data: {
        quetId: req.query.questId,
        questTaskid: 2,
        userId: "cl1288oym00048sir2ebhllz0",
        gainedPoints: points,
      },
    });
    return res.status(200).json(finisher);
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
