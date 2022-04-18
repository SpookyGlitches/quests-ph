import prisma from "../../lib/prisma";

const badges = {
  publisher: {
    badgeId: 8,
    message:
      "You have received a badge for creating your first post. Congratulations!",
  },
};

export default async function maybeAwardUserForPost(userId) {
  const { badgeId, message } = badges.publisher;
  const postBadgeCount = await prisma.userBadge.count({
    where: {
      userId,
      badgeId: 8,
    },
  });

  if (postBadgeCount === 0) {
    return {
      insertUserBadgeData: {
        userId,
        badgeId,
      },
      insertNotificationData: {
        userId,
        message,
        type: "RECEIVED_BADGE",
        metadata: JSON.stringify({ badgeId }),
      },
    };
  }
  return null;
}
