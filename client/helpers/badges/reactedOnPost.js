import prisma from "../../lib/prisma";

const badges = {
  expressive: {
    badgeId: 9,
    necessaryReacts: 10,
    message:
      "Congratulations! You have received a badge for reacting on 10 posts.",
  },
  supportiveComrade: {
    badgeId: 10,
    necessaryReacts: 50,
    message: "You have received a badge for reacting on 50 posts. Awesome!",
  },
};

export default async function maybeAwardUserForReact(userId) {
  const [reactsCount, userBadges] = await prisma.$transaction([
    prisma.postReact.count({
      where: {
        partyMember: {
          userId,
        },
        deletedAt: null,
      },
    }),
    prisma.userBadge.findMany({
      where: {
        badgeId: {
          in: [9, 10],
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
    reactsCount >= badges.expressive.necessaryReacts - 1
  ) {
    return {
      insertUserBadgeData: {
        userId,
        badgeId: badges.expressive.badgeId,
      },
      insertNotificationData: {
        userId,
        message: badges.expressive.message,
        type: "RECEIVED_BADGE",
        metadata: JSON.stringify({ badgeId: badges.expressive.badgeId }),
      },
    };
  }

  if (
    userBadges.length === 1 &&
    reactsCount >= badges.supportiveComrade.necessaryReacts - 1
  ) {
    return {
      insertUserBadgeData: {
        userId,
        badgeId: badges.supportiveComrade.badgeId,
      },
      insertNotificationData: {
        userId,
        message: badges.supportiveComrade.message,
        type: "RECEIVED_BADGE",
        metadata: JSON.stringify({ badgeId: badges.supportiveComrade.badgeId }),
      },
    };
  }

  return null;
}
