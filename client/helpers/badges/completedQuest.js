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

function insertDataForPrisma(
  users,
  badge,
  insertUserBadgeData,
  insertNotificationData,
) {
  const { badgeId, message, necessaryCompletedQuests } = badge;

  users.forEach((user) => {
    const meetsNecessaryCompleted =
      user.partyMembers.length >= necessaryCompletedQuests - 1; //

    const doesntHaveTheBadge = !user.userBadges.find(
      (userBadge) => userBadge.badgeId === badgeId,
    );

    // get users who have this specific number of completed quests and if they dont have that badgeID
    if (meetsNecessaryCompleted && doesntHaveTheBadge) {
      insertUserBadgeData.push({
        badgeId,
        userId: user.userId,
      });
      insertNotificationData.push({
        message,
        userId: user.userId,
        type: "RECEIVED_BADGE",
        metadata: JSON.stringify({ badgeId }),
      });
    }
  });
}

async function getPartyMembers(questId) {
  const quest = await prisma.quest.findUnique({
    where: {
      questId,
    },
    select: {
      partyMembers: {
        where: {
          user: {
            deletedAt: null,
          },
          deletedAt: null,
        },
        select: {
          partyMemberId: true,
          role: true,
          user: {
            select: {
              userId: true,
            },
          },
        },
      },
    },
    rejectOnNotFound: true,
  });

  const partyMemberUserIds = quest.partyMembers.map(
    (partyMember) => partyMember.user.userId,
  );

  const users = await prisma.user.findMany({
    where: {
      userId: {
        in: partyMemberUserIds,
      },
    },
    select: {
      role: true,
      userId: true,
      userBadges: {
        where: {
          badgeId: {
            in: [2, 3, 4, 13, 14],
          },
        },
        select: {
          userBadgeId: true,
          badgeId: true,
        },
      },
      partyMembers: {
        where: {
          quest: {
            NOT: [{ completedAt: null }],
            visibility: "PUBLIC",
            deletedAt: null,
          },
          deletedAt: null,
        },
        select: {
          questId: true,
        },
      },
    },
  });

  return users;
}

function groupUsers(users) {
  const mentors = [];
  const mentees = [];

  users.forEach((user) => {
    if (user.role === "mentor") mentors.push(user);
    else mentees.push(user);
  });

  return { mentors, mentees };
}

export default async function awardSomePartyMembersForCompletingQuest(questId) {
  // questId should be Number
  const users = await getPartyMembers(questId);
  const { mentors, mentees } = groupUsers(users);
  const { youngOne, achiever, manOfAction, paver, pathfinder } = badges;

  const userBadgeData = [];
  const notificationData = [];

  // inefficient :)
  // kay check siya for young one award and check again if legible for achiever

  insertDataForPrisma(mentees, youngOne, userBadgeData, notificationData);
  insertDataForPrisma(mentees, achiever, userBadgeData, notificationData);
  insertDataForPrisma(mentees, manOfAction, userBadgeData, notificationData);

  insertDataForPrisma(mentors, paver, userBadgeData, notificationData);
  insertDataForPrisma(mentors, pathfinder, userBadgeData, notificationData);

  return { userBadgeData, notificationData };
}
