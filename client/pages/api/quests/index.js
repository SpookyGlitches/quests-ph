// import prisma from "../../../lib/prisma";
import { PrismaClient, QuestRole } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

async function createQuest(req, res) {
  const user = await getSession({ req });
  const {
    wish,
    difficulty,
    visibility,
    category,
    wiki,
    startDate,
    endDate,
    obstacle,
    plan,
    outcome,
  } = req.body;
  console.log(req.body);
  const quest = await prisma.quest.create({
    data: {
      wish,
      difficulty,
      visibility,
      category,
      wiki,
      estimatedStartDate: startDate,
      estimatedEndDate: endDate,
      partyMembers: {
        create: {
          outcome,
          obstacle,
          plan,
          role: QuestRole.PARTY_LEADER,
          memberId: user.userId,
        },
      },
    },
  });
  return res.status(200).json({ quest });
}

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return createQuest(req, res);
    default:
      return res.sendStatus(404);
  }
}
