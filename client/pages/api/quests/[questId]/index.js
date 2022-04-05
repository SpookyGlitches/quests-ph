import { PrismaClientValidationError } from "@prisma/client/runtime";
import { ValidationError } from "yup";
import prisma from "../../../../lib/prisma";
import withQuestProtect from "../../../../middlewares/withQuestProtect";
import {
  step2Validations,
  wishValidation,
} from "../../../../validations/quest";

async function getQuest(req, res) {
  try {
    const quest = await prisma.quest.findUnique({
      where: {
        questId: Number(req.query.questId),
      },
    });
    res.status(200).json(quest);
  } catch (err) {
    res.status(404).send();
  }
}
async function updateQuest(req, res) {
  try {
    const { startDate, endDate, difficulty, visibility, category, wish } =
      req.body;

    await step2Validations.concat(wishValidation).validate({ ...req.body });
    const quest = await prisma.quest.update({
      where: {
        questId: Number(req.query.questId),
      },
      data: {
        estimatedEndDate: endDate,
        estimatedStartDate: startDate,
        difficulty,
        visibility,
        category,
        wish,
      },
    });
    res.status(200).send({ quest });
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

async function deleteQuest(req, res) {
  try {
    // https://github.com/prisma/prisma/issues/3398
    const { questId } = req.query;
    const questDelete = prisma.quest.delete({
      where: {
        questId: Number(questId),
      },
    });
    const memberDelete = prisma.partyMember.deleteMany({
      where: {
        questId: Number(questId),
      },
    });
    await prisma.$transaction([questDelete, memberDelete]);
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
  if (req.method === "GET") {
    await withQuestProtect(getQuest, req, res, [
      "MENTOR",
      "MENTEE",
      "PARTY_LEADER",
    ]);
  } else if (req.method === "PUT") {
    await withQuestProtect(updateQuest, req, res, ["PARTY_LEADER"]);
  } else if (req.method === "DELETE") {
    await withQuestProtect(deleteQuest, req, res, ["PARTY_LEADER"]);
  } else {
    res.status(405).send();
  }
}
