import { PrismaClientValidationError } from "@prisma/client/runtime";
import { ValidationError } from "yup";
import { QuestRole } from "@prisma/client";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { step1Validations, step2Validations } from "../../../validations/quest";

async function createQuest(req, res) {
  try {
    const {
      wish,
      difficulty,
      visibility,
      category,
      startDate,
      endDate,
      obstacle,
      plan,
      outcome,
    } = req.body;
    const user = await getSession({ req });
    await step1Validations.concat(step2Validations).validate({ ...req.body });
    const quest = await prisma.quest.create({
      data: {
        wish,
        difficulty,
        visibility,
        category,
        estimatedStartDate: startDate,
        estimatedEndDate: endDate,
        userId: user.userId,
        partyMembers: {
          create: {
            outcome,
            obstacle,
            plan,
            role: QuestRole.PARTY_LEADER,
            userId: user.userId,
          },
        },
      },
    });
    return res.status(200).json({ quest });
  } catch (err) {
    switch (err.constructor) {
      case ValidationError:
      case PrismaClientValidationError:
        return res.status(400).send();
      default:
        return res.status(500).send();
    }
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return createQuest(req, res);
    default:
      return res.sendStatus(404);
  }
}