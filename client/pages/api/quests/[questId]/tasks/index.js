import prisma from "../../../../../lib/prisma";

export default async function getAllTasks(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

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
