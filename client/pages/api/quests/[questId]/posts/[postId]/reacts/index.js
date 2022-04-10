import { getSession } from "next-auth/react";
import withQuestProtect from "../../../../../../../middlewares/withQuestProtect";
import maybeAwardUserForReact from "../../../../../../../helpers/badges/reactedOnPost";
import prisma from "../../../../../../../lib/prisma";

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
    const post = await prisma.post.findUnique({
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

    if (post.partyMemberId !== partyMember.partyMemberId) {
      if (post.partyMember.role !== "MENTOR") {
        // do not award when a post author reacts on their own post or if they are a mentor
        const awardPointsOperation = prisma.pointsLog.create({
          data: {
            partyMemberId: post.partyMemberId,
            gainedPoints: 5,
            action: "RECEIVED_POST_REACT",
          },
        });
        transactions.push(awardPointsOperation);
      }
    }

    // award badge
    const awardData = await maybeAwardUserForReact(user.userId);

    if (awardData) {
      const { insertUserBadgeData, insertNotificationData } = awardData;
      const insertUserBadgeOperation = prisma.userBadge.create({
        data: insertUserBadgeData,
      });
      const insertNotificationOperation = prisma.notification.create({
        data: insertNotificationData,
      });
      transactions.push(insertUserBadgeOperation);
      transactions.push(insertNotificationOperation);
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
