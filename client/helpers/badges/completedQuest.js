import prisma from "../../lib/prisma";

function insertQueuePrisma(users, badge) {
  const { badgeId, message, necessaryCompletedQuests } = badge;
  const prismaLegibleUsersOperations = [];

  users.forEach((user) => {
    const meetsNecessaryCompleted =
      user.partyMembers.length === necessaryCompletedQuests - 1; //

    const doesntHaveTheBadge = !user.userBadges.find(
      (userBadge) => userBadge.badgeId === badgeId,
    );

    // get users who have this specific number of completed quests and if they dont have that badgeID
    if (meetsNecessaryCompleted && doesntHaveTheBadge) {
      prismaLegibleUsersOperations.push({
        userBadgeOperation: {
          badgeId,
          userId: user.userId,
        },
        notificationOperation: {
          message,
          userId: user.userId,
          type: "RECEIVED_BADGE",
          metadata: JSON.stringify({ badgeId }),
        },
      });
    }
  });

  return prismaLegibleUsersOperations;
}

function combineForPrisma(x, y, z) {
  const userBadgesData = [];
  const notificationsData = [];

  x.forEach(({ userBadgeOperation, notificationOperation }) => {
    userBadgesData.push(userBadgeOperation);
    notificationsData.push(notificationOperation);
  });

  y.forEach(({ userBadgeOperation, notificationOperation }) => {
    userBadgesData.push(userBadgeOperation);
    notificationsData.push(notificationOperation);
  });

  z.forEach(({ userBadgeOperation, notificationOperation }) => {
    userBadgesData.push(userBadgeOperation);
    notificationsData.push(notificationOperation);
  });

  return { userBadgesData, notificationsData };
}

export default async function awardSomePartyMembersForCompletingQuest(questId) {
  // questId should be Number
  const quest = await prisma.quest.findUnique({
    where: {
      questId,
    },
    select: {
      partyMembers: {
        where: {
          deletedAt: null,
          user: {
            deletedAt: null,
          },
          NOT: [
            {
              role: "MENTOR",
            },
          ],
        },
        select: {
          partyMemberId: true,
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
      userId: true,
      userBadges: {
        where: {
          badgeId: {
            in: [2, 3, 4],
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
          },
          deletedAt: null,
        },
        select: {
          questId: true,
        },
      },
    },
  });

  console.log(users[0]);

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
  };

  const { youngOne, achiever, manOfAction } = badges;

  //   inefficient since userslegibleforyoungone will be checked again for achievers and so on but im not making it efficient :)
  // todo, ea: make this efficient
  const toAwardYoungOne = insertQueuePrisma(users, youngOne);
  const toAwardAchiever = insertQueuePrisma(users, achiever);
  const toAwardManOfAction = insertQueuePrisma(users, manOfAction);

  const { userBadgesData, notificationsData } = combineForPrisma(
    toAwardYoungOne,
    toAwardAchiever,
    toAwardManOfAction,
  );

  return { userBadgesData, notificationsData };
}
