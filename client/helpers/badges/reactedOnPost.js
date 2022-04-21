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

function shouldAward(reacts, necessaryReacts) {
  return reacts === necessaryReacts - 1;
}

export default async function maybeAwardUserForReact(userId) {
  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      userCurrency: {
        select: {
          postReacts: true,
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
      postReacts: {
        increment: 1,
      },
    },
  };

  const badgesToCheck = [badges.expressive, badges.supportiveComrade];

  let x = 0;
  let insertUserBadgeData = null;
  let insertNotificationData = null;
  const {
    userCurrency: { postReacts },
  } = user;

  while (x < badgesToCheck.length) {
    const award = shouldAward(postReacts, badgesToCheck[x].necessaryReacts);
    if (award) {
      insertUserBadgeData = {
        userId,
        badgeId: badgesToCheck[x].badgeId,
      };
      insertNotificationData = {
        userId,
        message: badgesToCheck[x].message,
        type: "RECEIVED_BADGE",
        metadata: JSON.stringify({ badgeId: badgesToCheck[x].badgeId }),
      };
      break;
    }
    x++;
  }
  return { updateUserCurrency, insertUserBadgeData, insertNotificationData };
}
