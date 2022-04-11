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

export default async function maybeAwardUserForComment(userId) {
  const [commentsCount, userBadges] = await prisma.$transaction([
    prisma.comment.count({
      where: {
        partyMember: {
          userId,
        },
        post: {
          partyMember: {
            userId: {
              not: userId,
            },
          },
        },
        deletedAt: null,
      },
    }),
    prisma.userBadge.findMany({
      where: {
        badgeId: {
          in: [11, 12],
        },
        userId,
      },
      select: {
        badgeId: true,
      },
    }),
  ]);

  if (
    userBadges.length === 0 &&
    commentsCount >= badges.insightful.necessaryComments - 1
  ) {
    return {
      insertUserBadgeData: {
        userId,
        badgeId: badges.insightful.badgeId,
      },
      insertNotificationData: {
        userId,
        message: badges.insightful.message,
        type: "RECEIVED_BADGE",
        metadata: JSON.stringify({ badgeId: badges.insightful.badgeId }),
      },
    };
  }

  if (
    userBadges.length === 1 &&
    commentsCount >= badges.sage.necessaryComments - 1
  ) {
    return {
      insertUserBadgeData: {
        userId,
        badgeId: badges.sage.badgeId,
      },
      insertNotificationData: {
        userId,
        message: badges.sage.message,
        type: "RECEIVED_BADGE",
        metadata: JSON.stringify({ badgeId: badges.sage.badgeId }),
      },
    };
  }
  return null;
}
