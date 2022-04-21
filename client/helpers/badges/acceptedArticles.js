import prisma from "../../lib/prisma";

const badges = {
  contributor: {
    badgeId: 15,
    necessaryAcceptedArticles: 10,
    message:
      "You have received a badge for having 10 articles approved. Keep it up!",
  },
  educator: {
    badgeId: 16,
    necessaryAcceptedArticles: 50,
    message:
      "Congratulations! You have received a badge for having 50 articles approved.",
  },
};

function shouldAward(acceptedArticles, necessaryAcceptedArticles) {
  return acceptedArticles === necessaryAcceptedArticles - 1;
}

export default async function maybeAwardUserForArticle(userId) {
  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      userCurrency: {
        select: {
          acceptedArticles: true,
        },
      },
    },
    rejectOnNotFound: true,
  });
  const {
    userCurrency: { acceptedArticles },
  } = user;

  const updateUserCurrency = {
    where: {
      userId,
    },
    data: {
      acceptedArticles: {
        increment: 1,
      },
    },
  };

  const badgesToCheck = [badges.contributor, badges.educator];
  let insertUserBadgeData = null;
  let insertNotificationData = null;

  for (let x = 0; x < badgesToCheck.length; x++) {
    const { badgeId, message, necessaryAcceptedArticles } = badgesToCheck[x];
    const award = shouldAward(acceptedArticles, necessaryAcceptedArticles);
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
