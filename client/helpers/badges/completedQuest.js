import prisma from "../../lib/prisma";

const badges = {
  youngOne: {
    badgeId: 2,
    necessaryCompletedQuests: 1,
    message:
      "Awesome! You have received a badge for completing a public Quest.",
  },
  achiever: {
    badgeId: 3,

    necessaryCompletedQuests: 10,
    message:
      "You have received a badge for completing 10 public Quests. You're an achiever!",
  },
  manOfAction: {
    badgeId: 4,
    necessaryCompletedQuests: 50,
    message:
      "A fine man of action. You have received a badge for completing 50 public Quests.",
  },
  paver: {
    badgeId: 13,
    necessaryCompletedQuests: 10, // alias for mentoredQuests
    message: `You have received a badge for successfully mentoring 10 public Quests. ${"You're"} awesome!`,
  },
  pathfinder: {
    badgeId: 14,
    necessaryCompletedQuests: 50, // alias for mentoredQuests
    message:
      "The world needs pathfinders like you. You have received a badge for successfully mentoring 50 public Quests.",
  },
};

async function getPartyMembersInfo(questId) {
  const partyMembers = await prisma.partyMember.findMany({
    where: {
      questId,
      deletedAt: null,
    },
    take: 5,
    select: {
      userId: true,
      role: true,
      partyMemberId: true,
      user: {
        select: {
          userCurrency: {
            select: {
              completedPublicQuests: true,
            },
          },
        },
      },
    },
  });
  return partyMembers;
}

function shouldAward(completedPublicQuests, necessaryCompletedQuests) {
  return completedPublicQuests === necessaryCompletedQuests - 1;
}

function insertDataForPrisma(
  userId,
  badgeId,
  message,
  insertUserBadgeData,
  insertNotificationData,
) {
  insertUserBadgeData.push({
    badgeId,
    userId,
  });
  insertNotificationData.push({
    message,
    userId,
    type: "RECEIVED_BADGE",
    metadata: JSON.stringify({ badgeId }),
  });
}

function updatePartyMembersCurrencies(partyMembersInfo) {
  const mappedUserIds = partyMembersInfo.map(
    (partyMember) => partyMember.userId,
  );
  const userCurrencyUpdate = {
    where: {
      userId: {
        in: mappedUserIds,
      },
    },
    data: {
      completedPublicQuests: {
        increment: 1,
      },
    },
  };

  return userCurrencyUpdate;
}

export default async function awardSomePartyMembersForCompletingQuest(questId) {
  const partyMembersInfo = await getPartyMembersInfo(questId);

  const userBadgeData = [];
  const notificationData = [];

  const updateUsersCurrencies = updatePartyMembersCurrencies(partyMembersInfo);

  const { youngOne, achiever, manOfAction, paver, pathfinder } = badges;
  const menteeBadges = [youngOne, achiever, manOfAction];
  const mentorBadges = [paver, pathfinder];

  partyMembersInfo.forEach((partyMember) => {
    const {
      userId,
      role,
      user: { userCurrency },
    } = partyMember;
    let badgesForCheck = [];

    if (role === "MENTOR") {
      badgesForCheck = mentorBadges;
    } else {
      badgesForCheck = menteeBadges;
    }

    let x = 0;
    let awarded = false;
    while (!awarded && x < badgesForCheck.length) {
      const award = shouldAward(
        userCurrency.completedPublicQuests,
        badgesForCheck[x].necessaryCompletedQuests,
      );
      if (award) {
        insertDataForPrisma(
          userId,
          badgesForCheck[x].badgeId,
          badgesForCheck[x].message,
          userBadgeData,
          notificationData,
        );
      }
      awarded = award;
      x++;
    }
  });

  return { userBadgeData, notificationData, updateUsersCurrencies };
}
