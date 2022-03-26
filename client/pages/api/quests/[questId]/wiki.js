import { PrismaClientValidationError } from "@prisma/client/runtime";
import { ValidationError } from "yup";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      await prisma.quest.update({
        where: {
          questId: Number(req.query.questId),
        },
        data: {
          wiki: req.body.wiki,
        },
      });
      res.status(200).send();
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
  } else {
    res.status(405).send();
  }
}
