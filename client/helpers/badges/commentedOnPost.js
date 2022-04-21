import prisma from "../../lib/prisma";

const badges = {
  insightful: {
    badgeId: 11,
    necessaryComments: 10,
    message:
      "You have received a badge for commenting on 10 posts. Congratulations!",
  },
  sage: {
    badgeId: 12,
    necessaryComments: 50,
    message:
      "We have a sage here and that is you. You have received a badge for commenting on 50 posts.",
  },
};

function shouldAward(comments, necessaryComments) {
  return comments === necessaryComments - 1;
}

export default async function maybeAwardUserForComment(userId) {
  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      userCurrency: {
        select: {
          comments: true,
        },
      },
    },
    rejectOnNotFound: true,
  });
  const {
    userCurrency: { comments },
  } = user;

  const badgesToCheck = [badges.insightful, badges.sage];
  let insertUserBadgeData = null;
  let insertNotificationData = null;

  const updateUserCurrency = {
    where: {
      userId,
    },
    data: {
      comments: {
        increment: 1,
      },
    },
  };

  for (let x = 0; x < badgesToCheck.length; x++) {
    const { badgeId, message, necessaryComments } = badgesToCheck[x];
    const award = shouldAward(comments, necessaryComments);
    if (award) {
      insertUserBadgeData = {
        userId,
        badgeId,
      };
      insertNotificationData = {
        userId,
        message,
        type: "RECEIVED_BADGE",
        metadata: JSON.stringify({ badgeId }),
      };
      break;
    }
  }

  return { updateUserCurrency, insertUserBadgeData, insertNotificationData };
}
