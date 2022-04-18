import { PrismaClientValidationError } from "@prisma/client/runtime";
import prisma from "../../../../lib/prisma";
import withQuestProtect from "../../../../middlewares/withQuestProtect";

async function editWiki(req, res) {
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
      case PrismaClientValidationError:
        res.status(400).send();
        break;
      default:
        res.status(500).send();
    }
  }
}
export default async function handler(req, res) {
  if (req.method === "PUT") {
    await withQuestProtect(editWiki, req, res, ["PARTY_LEADER", "MENTOR"]);
  } else {
    res.status(405).send();
  }
}
