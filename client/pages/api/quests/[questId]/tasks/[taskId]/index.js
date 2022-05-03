import { PrismaClientValidationError } from "@prisma/client/runtime";
import { ValidationError } from "yup";
import prisma from "../../../../../../lib/prisma";
import { createTaskSchema } from "../../../../../../validations/TasksCreate";

async function getTask(req, res) {
  try {
    const task = await prisma.questTask.findUnique({
      where: {
        questTaskid: Number(req.query.taskId),
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

    await createTaskSchema.validate({ ...req.body });
    const task = await prisma.questTask.update({
      where: {
        questTaskid: Number(req.query.taskId),
      },
      data: {
        title,
        description,
        points,
        dueAt: dueDate,
      },
    });

    res.status(200).json(task);
  } catch (err) {
    switch (err.constructor) {
      case ValidationError:
      case PrismaClientValidationError:
        res.status(400).send();
        break;
      default:
        res.status(500).send();
    }
  }
}

async function taskDelete(req, res) {
  const { taskId } = req.query;

  try {
    const deletedTask = prisma.questTask.delete({
      where: {
        questTaskid: Number(taskId),
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
