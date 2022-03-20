import prisma from "../../../../../../lib/prisma";

async function getTask(req, res) {
  try {
    const task = await prisma.questTasks.findUnique({
      where: {
        id: Number(req.query.taskId),
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error getting this task information" });
    console.log(error);
  }
}

async function updateTask(req, res) {
  try {
    const { title, description, points, dueDate } = req.body;

    const task = await prisma.questTasks.update({
      where: {
        id: Number(req.query.taskId),
      },
      data: {
        title,
        description,
        points,
        dueAt: dueDate,
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating this task" });
    console.log(error);
  }
}

async function taskDelete(req, res) {
  const { taskId } = req.query;

  try {
    const deletedTask = prisma.questTasks.delete({
      where: {
        id: Number(taskId),
      },
    });

    await prisma.$transaction([deletedTask]);
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
}

export default async function handler(req, res) {
  if (req.method === "PUT") {
    await updateTask(req, res);
  } else if (req.method === "DELETE") {
    await taskDelete(req, res);
  } else if (req.method === "GET") {
    await getTask(req, res);
  }
}
