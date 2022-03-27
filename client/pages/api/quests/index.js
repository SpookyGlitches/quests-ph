import { PrismaClientValidationError } from "@prisma/client/runtime";
import { ValidationError } from "yup";
import { PartyMemberRole } from "@prisma/client";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { step1Validations, step2Validations } from "../../../validations/quest";

function computeIfJoined(quests) {
  const computed = quests.map((item) => {
    return {
      ...item,
      isJoined: item.partyMembers && item.partyMembers.length !== 0,
    };
  });
  return computed;
}

async function getQuests(req, res) {
  const { user } = await getSession({ req });
  try {
    const quests = await prisma.quest.findMany({
      include: {
        partyMembers: {
          where: {
            userId: user.userId,
          },
        },
      },
    });

    const computed = computeIfJoined(quests);
    return res.status(200).json(computed);
  } catch (error) {
    switch (error.constructor) {
      case ValidationError:
      case PrismaClientValidationError:
        return res.status(400).send();
      default:
        return res.status(500).send();
    }
  }
}

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
    const { user } = await getSession({ req });
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
            role: PartyMemberRole.PARTY_LEADER,
            userId: user.userId,
          },
        },
      },
    });
    return res.status(200).json({ quest });
  } catch (err) {
    console.error(err);
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
    case "GET":
      return getQuests(req, res);
    case "POST":
      return createQuest(req, res);
    default:
      return res.sendStatus(404);
  }
}
