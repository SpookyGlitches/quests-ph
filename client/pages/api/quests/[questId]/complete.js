import { PrismaClientValidationError } from "@prisma/client/runtime";
import prisma from "../../../../lib/prisma";

async function completeQuest(req, res) {
  try {
    await prisma.quest.update({
      where: {
        questId: Number(req.query.questId),
      },
      data: {
        completedAt: new Date(),
      },
    });
    res.status(200).send();
  } catch (err) {
    switch (err.constructor) {
      case PrismaClientValidationError:
        res.status(400).send();
        break;
      default:
        res.status(500).send();
    }
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      return completeQuest(req, res);
    default:
      return res.sendStatus(405);
  }
}
