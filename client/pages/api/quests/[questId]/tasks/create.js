import prisma from "../../../../../lib/prisma";

import { getSession } from "next-auth/react";

export default async function createQuest(req, res) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  const { user } = await getSession({ req });

  try {
    if (req.body) {
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
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
