import { PrismaClientValidationError } from "@prisma/client/runtime";
import { ValidationError } from "yup";
import { PartyMemberRole } from "@prisma/client";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { step1Validations, step2Validations } from "../../../validations/quest";
import maybeAwardUser from "../../../helpers/badges/startedQuest";

function computeIfJoined(quests) {
  const computed = [];

  let canJoin;
  quests.forEach((item) => {
    canJoin = item.partyMembers.length === 0;
    computed.push({
      ...item,
      canJoin,
    });
  });
  return computed;
}

async function getQuests(req, res) {
  const { user } = await getSession({ req });
  try {
    const quests = await prisma.quest.findMany({
      where: {
        questPartyBan: {
          none: {
            userId: user.userId,
            NOT: [
              {
                deletedAt: null,
              },
            ],
          },
        },
        partyMembers: {
          every: {
            userId: user.userId,
            deletedAt: null,
          },
        },

        // OR: [
        //   // {
        //   //   visibility: "PUBLIC",
        //   // },
        //   {

        //   },
        // ],
      },

      select: {
        wish: true,
        estimatedStartDate: true,
        estimatedEndDate: true,
        questId: true,
        partyMembers: {
          select: {
            partyMemberId: true,
            userId: true,
          },
          where: {
            userId: user.userId,
          },
        },
      },
    });
    const computed = computeIfJoined(quests);
    return res.status(200).json(computed);
  } catch (error) {
    console.error(error);
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
    const transactions = [];
    const insertQuestWithMemberOperation = prisma.quest.create({
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

    transactions.push(insertQuestWithMemberOperation);

    if (visibility === "PUBLIC") {
      const awardData = await maybeAwardUser(user.userId);

      if (awardData) {
        console.log("User is awarded");
        const { insertUserBadgeData, insertNotificationData } = awardData;
        const insertUserBadgeOperation = prisma.userBadge.create({
          data: insertUserBadgeData,
        });

        const insertNotificationOperation = prisma.notification.create({
          data: insertNotificationData,
        });
        transactions.push(insertUserBadgeOperation);
        transactions.push(insertNotificationOperation);
      } else {
        console.log("User is not awarded");
      }
    }

    const [quest] = await prisma.$transaction(transactions);

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
      return res.status(404).send();
  }
}
