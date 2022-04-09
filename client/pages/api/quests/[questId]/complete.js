import { PrismaClient } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import awardSomePartyMembersForCompletingQuest from "../../../../helpers/badges/completedQuest";
// import prisma from "../../../../lib/prisma";
const prisma = new PrismaClient();
async function completeQuest(req, res) {
  try {
    const { questId } = req.query;
    const parsedQuestId = Number(questId);

    const { userBadgesData, notificationsData } =
      await awardSomePartyMembersForCompletingQuest(parsedQuestId);
    const transactions = [];

    const updateQuest = prisma.quest.update({
      where: {
        questId: parsedQuestId,
      },
      data: {
        completedAt: new Date(),
      },
    });
    transactions.push(updateQuest);

    if (userBadgesData.length !== 0) {
      const insertUserBadges = prisma.userBadge.createMany({
        data: userBadgesData,
      });

      const insertNotifications = prisma.notification.createMany({
        data: notificationsData,
      });

      transactions.push(insertUserBadges);
      transactions.push(insertNotifications);
    }
    await prisma.$transaction(transactions);

    res.status(200).send(transactions);
  } catch (err) {
    console.log(err);
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
      return res.status(405).send();
  }
}
