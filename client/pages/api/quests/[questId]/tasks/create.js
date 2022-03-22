import prisma from "../../../../../lib/prisma";

export default async function createQuest(req, res) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    if (req.body) {
      const { title, description, points, dueDate } = req.body;

      const task = await prisma.questTasks.create({
        data: {
          questId: 1,
          mentorId: 1,
          title,
          description,
          points,
          dueAt: dueDate,
        },
      });
      return res
        .status(200)
        .json({ task, message: "successfully inserted to db" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
