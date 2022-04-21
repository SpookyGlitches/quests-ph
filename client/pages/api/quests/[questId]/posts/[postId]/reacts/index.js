import { getSession } from "next-auth/react";
import withQuestProtect from "../../../../../../../middlewares/withQuestProtect";
import maybeAwardUserForReact from "../../../../../../../helpers/badges/reactedOnPost";
import prisma from "../../../../../../../lib/prisma";

async function getReacts(req, res) {
  try {
    const reacts = await prisma.postReact.findMany({
      where: {
        postId: Number(req.query.postId),
      },
      select: {
        postReactId: true,
        postId: true,
        type: true,
        partyMemberId: true,
        partyMember: {
          select: {
            userId: true,
          },
        },
      },
    });
    return res.json(reacts);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
}

async function addReact(req, res) {
  try {
    const { type, partyMember } = req.body;
    const { postId } = req.query;
    const parsedPostId = Number(postId);
    const { user } = await getSession({ req });
    const existingReact = await prisma.postReact.findFirst({
      where: {
        partyMemberId: partyMember.partyMemberId,
        postId: parsedPostId,
      },
    });
    if (existingReact) return res.status(400).send();

    const transactions = [];

    const postReactOperation = prisma.postReact.create({
      data: {
        type,
        partyMemberId: partyMember?.partyMemberId,
        postId: parsedPostId,
      },
    });

    transactions.push(postReactOperation);

    // award award points brother
    const {
      partyMemberId: authorPartyMemberId,
      partyMember: { role: authorRole },
    } = await prisma.post.findUnique({
      where: {
        postId: parsedPostId,
      },
      select: {
        partyMemberId: true,
        partyMember: {
          select: {
            role: true,
          },
        },
      },
      rejectOnNotFound: true,
    });

    if (authorPartyMemberId !== partyMember.partyMemberId) {
      if (authorRole !== "MENTOR") {
        // do not award when a post author reacts on their own post or if they are a mentor
        const awardPointsOperation = prisma.pointsLog.create({
          data: {
            partyMemberId: authorPartyMemberId,
            gainedPoints: 5,
            action: "RECEIVED_POST_REACT",
          },
        });
        transactions.push(awardPointsOperation);
      }

      const {
        updateUserCurrency,
        insertUserBadgeData,
        insertNotificationData,
      } = await maybeAwardUserForReact(user.userId);

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
      // end of badge awards
    }

    const [postReact] = await prisma.$transaction(transactions);
    return res.json(postReact);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return withQuestProtect(getReacts, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);
    case "POST":
      return withQuestProtect(addReact, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);
    default:
      return res.status(405).send();
  }
}
