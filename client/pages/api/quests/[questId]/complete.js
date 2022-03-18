import { PrismaClientValidationError } from "@prisma/client/runtime";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      await prisma.quest.update({
        where: {
          questId: Number(req.query.questId),
        },
        data: {
          completedAt: new Date(),
        },
      });
    } catch (err) {
      switch (err.constructor) {
        case PrismaClientValidationError:
          res.status(400).send();
          break;
        default:
          res.status(500).send();
      }
    }
  } else {
    res.status(405).send();
  }
}
