import prisma from "../../lib/prisma";

const badges = {
  littleShot: {
    badgeId: 5,
    necessaryStartedQuests: 1,
    message:
      "You have received a badge for starting a public Quest. Good luck on your journey!",
  },
  // !! REMOVE TEMP NUMBER OF QUESTS
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

function insertQueuePrisma(user, badge) {
  const { badgeId, message, necessaryStartedQuests } = badge;

  const meetsNecessaryStarted =
    user.partyMembers.length >= necessaryStartedQuests - 1;
  const doesntHaveTheBadge = !user.userBadges.find(
    (userBadge) => userBadge.badgeId === badgeId,
  );

  if (meetsNecessaryStarted && doesntHaveTheBadge) {
    return {
      insertUserBadgeData: {
        badgeId,
        userId: user.userId,
      },
      insertNotificationData: {
        message,
        userId: user.userId,
        type: "RECEIVED_BADGE",
        metadata: JSON.stringify({ badgeId }),
      },
    };
  }

  return null;
}

export default async function maybeAwardUser(userId) {
  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      userId: true,
      userBadges: {
        select: {
          userBadgeId: true,
          badgeId: true,
        },
        where: {
          badgeId: {
            in: [5, 6, 7],
          },
        },
      },
      partyMembers: {
        select: {
          questId: true,
        },
        where: {
          role: "PARTY_LEADER",
          quest: {
            visibility: "PUBLIC",
            deletedAt: null,
          },
          deletedAt: null,
        },
      },
    },
    rejectOnNotFound: true,
  });

  const legibleForLittleShot = insertQueuePrisma(user, badges.littleShot);
  if (legibleForLittleShot) return legibleForLittleShot;

  const legibleForFineMover = insertQueuePrisma(user, badges.fineMover);

  if (legibleForFineMover) return legibleForFineMover;

  const legibleForInitiator = insertQueuePrisma(user, badges.initiator);
  if (legibleForInitiator) return legibleForInitiator;

  return null;
}
