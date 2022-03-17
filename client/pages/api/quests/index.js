import { QuestRole } from "@prisma/client";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

async function createQuest(req, res) {
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
  const user = await getSession({ req });

  const quest = await prisma.quest.create({
    data: {
      wish,
      difficulty,
      visibility,
      category,
      wiki,
      estimatedStartDate: startDate,
      estimatedEndDate: endDate,
      creatorId: user.userId,
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
