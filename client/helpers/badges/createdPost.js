import prisma from "../../lib/prisma";

const badges = {
  publisher: {
    badgeId: 8,
    message:
      "You have received a badge for creating your first post. Congratulations!",
    necessaryPosts: 1,
  },
};

export default async function maybeAwardUserForPost(userId) {
  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      userCurrency: {
        select: {
          posts: true,
        },
      },
    },
    rejectOnNotFound: true,
  });

  const updateUserCurrency = {
    where: {
      userId,
    },
    data: {
      posts: {
        increment: 1,
      },
    },
  };

  let insertUserBadgeData = null;
  let insertNotificationData = null;
  const {
    userCurrency: { posts },
  } = user;
  const award = posts === badges.publisher.necessaryPosts - 1;
  const { badgeId, message } = badges.publisher;
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
  }

  return { updateUserCurrency, insertUserBadgeData, insertNotificationData };
}
