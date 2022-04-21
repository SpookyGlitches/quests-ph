import { getSession } from "next-auth/react";
import postValidations from "../../../../../validations/post";
import maybeAwardUserForPost from "../../../../../helpers/badges/createdPost";

import prisma from "../../../../../lib/prisma";

async function getPosts(req, res) {
  const { questId, skip, take } = req.query;

  const parsedTake = Number(take) || undefined;
  const parsedSkip = parsedTake * Number(skip) || undefined;

  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: parsedSkip,
      take: parsedTake,
      where: {
        partyMember: {
          questId: Number(questId),
          deletedAt: null, // means the partyMember is still active in the quest
          user: {
            deletedAt: null,
          },
        },
        deletedAt: null,
      },
      select: {
        postId: true,
        partyMember: {
          select: {
            questId: true,
          },
        },
      },
    });

    return res.status(200).send(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

async function createPost(req, res) {
  try {
    const { title, body, files } = req.body;
    const { user } = await getSession({ req });
    await postValidations.validate({ title, body });
    const partyMember = await prisma.partyMember.findFirst({
      where: {
        questId: Number(req.query.questId),
        userId: user.userId,
      },
      select: {
        partyMemberId: true,
      },
      rejectOnNotFound: true,
    });
    const transactions = [];

    const createPostOperation = prisma.post.create({
      data: {
        title,
        body,
        partyMemberId: partyMember.partyMemberId,
        postFiles: {
          connect: files,
        },
      },
    });
    transactions.push(createPostOperation);

    // award badge
    const { updateUserCurrency, insertNotificationData, insertUserBadgeData } =
      await maybeAwardUserForPost(user.userId);

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

    const [post] = await prisma.$transaction(transactions);

    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(400).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getPosts(req, res);
    case "POST":
      return createPost(req, res);
    default:
      return res.status(405).send();
  }
}
