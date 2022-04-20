import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

export default async function createQuest(req, res) {
  const { user } = await getSession({ req });

  try {
    const { title, description, points, dueDate } = req.body;

    const task = await prisma.questTask.create({
      data: {
        questId: Number(req.query.questId),
        userId: user.userId,
        title,
        description,
        points,
        dueAt: dueDate,
      },
    });
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
  }
  return res.status(400).json({ message: "Something went wrong" });
}
