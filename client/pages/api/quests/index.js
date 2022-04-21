import { PrismaClientValidationError } from "@prisma/client/runtime";
import { ValidationError } from "yup";
import { PartyMemberRole } from "@prisma/client";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { step1Validations, step2Validations } from "../../../validations/quest";
import maybeAwardUserForStartingQuest from "../../../helpers/badges/startedQuest";

function computeIfJoined(quests, role, userId) {
  const computed = [];

  let joined = false;
  let canJoin = false;
  quests.forEach((item) => {
    joined = item.partyMembers.some((member) => member.userId === userId);
    canJoin =
      !item.completedAt &&
      !joined &&
      role !== "mentor" &&
      item.partyMembers.length < 4;
    computed.push({
      ...item,
      joined,
      canJoin,
    });
  });
  return computed;
}

async function getQuests(req, res) {
  const { user } = await getSession({ req });
  const { searching, search, take, skip, category, status, startsAt } =
    req.query;
  const parsedTake = Number(take) || undefined;
  const parsedSkip = parsedTake * Number(skip) || undefined;

  let withCategory;
  let withStatus;

  if (category && category.length > 0) {
    withCategory = {
      category: {
        in: category.split(","),
      },
    };
  }

  if (status) {
    if (status === "COMPLETED") {
      withStatus = {
        NOT: [
          {
            completedAt: null,
          },
        ],
      };
    } else if (status === "ACTIVE") {
      withStatus = {
        completedAt: null,
      };
    }
  }

  const filtered = {
    OR: [
      {
        partyMembers: {
          some: {
            userId: user.userId,
            deletedAt: null,
          },
        },
      },
    ],
  };

  if (searching === "true") {
    filtered.OR.push({ visibility: "PUBLIC" });
  }

  try {
    const quests = await prisma.quest.findMany({
      where: {
        questPartyBan: {
          none: {
            userId: user.userId,
            deletedAt: null,
          },
        },
        wish: {
          search: search || undefined,
        },
        ...withCategory,
        ...withStatus,
        AND: [
          {
            ...filtered,
          },
        ],
        estimatedStartDate: {
          lte: startsAt ? new Date(startsAt) : undefined,
        },
      },
      skip: parsedSkip,
      take: parsedTake,
      select: {
        wish: true,
        category: true,
        estimatedStartDate: true,
        estimatedEndDate: true,
        questId: true,
        completedAt: true,
        difficulty: true,
        partyMembers: {
          select: {
            partyMemberId: true,
            userId: true,
          },
          where: {
            deletedAt: null,
          },
        },
      },
    });
    const computed = computeIfJoined(quests, user.role, user.userId);
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
  try {
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
        wiki: '[{"type":"h1","children":[{"text":"Welcome"}]},{"type":"p","children":[{"text":"This is our Wiki where you can find tips, resources, and strategies to increase the success of us achieving our wishes. If you want to add something here, just send me a message in our chat!"}]},{"type":"p","children":[{"text":""}]}]',
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
      const {
        updateUserCurrency,
        insertNotificationData,
        insertUserBadgeData,
      } = await maybeAwardUserForStartingQuest(user.userId);

      const updateUserCurrencyOperation = prisma.userCurrency.update({
        where: updateUserCurrency.where,
        data: updateUserCurrency.data,
      });
      transactions.push(updateUserCurrencyOperation);

      if (insertNotificationData && insertUserBadgeData) {
        const insertUserBadgeOperation = prisma.userBadge.create({
          data: insertUserBadgeData,
        });

        const insertNotificationOperation = prisma.notification.create({
          data: insertNotificationData,
        });
        transactions.push(insertUserBadgeOperation);
        transactions.push(insertNotificationOperation);
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
