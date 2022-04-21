import { getSession } from "next-auth/react";
import prisma from "../../../../../../../lib/prisma";
import withQuestProtect from "../../../../../../../middlewares/withQuestProtect";
import maybeAwardUserForComment from "../../../../../../../helpers/badges/commentedOnPost";

async function addComment(req, res) {
  try {
    const { content, partyMember } = req.body;
    const { postId } = req.query;
    const parsedPostId = Number(postId);
    const { user } = await getSession({ req });

    const post = await prisma.post.findUnique({
      where: {
        postId: parsedPostId,
      },
      select: {
        // the user we will give points to
        partyMemberId: true,
        partyMember: {
          select: {
            role: true,
          },
        },
      },
      rejectOnNotFound: true,
    });

    const transactions = [];

    const commentOperation = prisma.comment.create({
      data: {
        content,
        postId: Number(postId),
        partyMemberId: partyMember.partyMemberId,
      },
    });
    transactions.push(commentOperation);

    if (
      post.partyMemberId !== partyMember.partyMemberId &&
      post.partyMember.role !== "MENTOR"
    ) {
      // do not award when a post author comments on their own post and mentors
      const awardPointsOperation = prisma.pointsLog.create({
        data: {
          partyMemberId: post.partyMemberId, // the one who created the post
          gainedPoints: 10,
          action: "RECEIVED_POST_COMMENT",
        },
      });
      transactions.push(awardPointsOperation);
    }

    const { updateUserCurrency, insertUserBadgeData, insertNotificationData } =
      await maybeAwardUserForComment(user.userId);

    const updateUserCurrencyOperation = prisma.userCurrency.update({
      where: updateUserCurrency.where,
      data: updateUserCurrency.data,
    });
    transactions.push(updateUserCurrencyOperation);

    if (insertUserBadgeData && insertNotificationData) {
      const insertUserBadgeOperation = prisma.userBadge.create({
        data: insertUserBadgeData,
      });
      const insertNotificationOperation = prisma.notification.create({
        data: insertNotificationData,
      });
      transactions.push(insertUserBadgeOperation);
      transactions.push(insertNotificationOperation);
    }

    const [comment] = await prisma.$transaction(transactions);
    return res.json(comment);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

async function getComments(req, res) {
  try {
    const { postId } = req.query;
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(postId),
        partyMember: {
          deletedAt: null,
          user: {
            deletedAt: null,
          },
        },
      },
      select: {
        content: true,
        commentId: true,
        createdAt: true,
        updatedAt: true,
        partyMemberId: true,
        partyMember: {
          select: {
            user: {
              select: {
                userId: true,
                displayName: true,
                image: true,
              },
            },
          },
        },
        commentReacts: {
          select: {
            type: true,
            commentReactId: true,
            partyMember: {
              select: {
                user: {
                  select: {
                    userId: true,
                  },
                },
              },
            },
          },
          where: {
            deletedAt: null,
          },
        },
      },
    });
    return res.json(comments);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return withQuestProtect(getComments, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);
    case "POST":
      return withQuestProtect(addComment, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);
    default:
      return res.status(405).send();
  }
}
