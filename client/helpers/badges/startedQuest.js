import prisma from "../../lib/prisma";

const badges = {
  littleShot: {
    badgeId: 5,
    necessaryStartedQuests: 1,
    message:
      "You have received a badge for starting a public Quest. Good luck on your journey!",
  },
  fineMover: {
    badgeId: 6,
    necessaryStartedQuests: 10,
    message:
      "A fine mover is what we see from you. You have received a badge for starting 10 public Quests.",
  },
  initiator: {
    badgeId: 7,
    necessaryStartedQuests: 50,
    message:
      "You have received a badge for starting 50 public Quests. Initiators like you are what the world needs!.",
  },
};

function shouldAward(startedPublicQuests, necessaryStartedQuests) {
  return startedPublicQuests === necessaryStartedQuests - 1;
}

export default async function maybeAwardUserForStartingQuest(userId) {
  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      userCurrency: {
        select: {
          startedPublicQuests: true,
        },
      },
    },
    rejectOnNotFound: true,
  });

  const {
    userCurrency: { startedPublicQuests },
  } = user;

  let insertUserBadgeData = null;
  let insertNotificationData = null;

  const updateUserCurrency = {
    where: {
      userId,
    },
    data: {
      startedPublicQuests: {
        increment: 1,
      },
    },
  };

  const badgesToCheck = [badges.littleShot, badges.fineMover, badges.initiator];

  for (let x = 0; x < badgesToCheck.length; x++) {
    const { badgeId, message, necessaryStartedQuests } = badgesToCheck[x];
    const award = shouldAward(startedPublicQuests, necessaryStartedQuests);
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
  return { updateUserCurrency, insertNotificationData, insertUserBadgeData };
}
