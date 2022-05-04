import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(403).send();
  }

  const { userId } = req.query;
  try {
    const userCurrency = prisma.userCurrency.findUnique({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            role: true,
          },
        },
      },
    });
    const mentor = userCurrency.user.role === "mentor";

    const userPoints = prisma.pointsLog.findMany({
      where: {
        partyMember: {
          userId,
          deletedAt: null,
        },
      },
    });

    const userPublicQuests = prisma.partyMember.findMany({
      where: {
        userId,
        quest: {
          visibility: "PUBLIC",
          NOT: [
            {
              completedAt: null,
            },
          ],
        },
      },
      select: {
        quest: {
          select: {
            difficulty: true,
          },
        },
      },
    });
    const transactions = [userCurrency, userPoints, userPublicQuests];

    const [currency, pointsLog, publicQuests] = await prisma.$transaction(
      transactions,
    );

    const completedTasks = pointsLog.filter(
      (log) => log.action === "COMPLETED_TASK",
    );
    const receivedReacts = pointsLog.filter(
      (log) =>
        log.action === "RECEIVED_COMMENT_REACT" ||
        log.action === "RECEIVED_POST_REACT",
    );

    let publicQuestsPoints = 0;
    publicQuests.forEach((partyMember) => {
      switch (partyMember.quest.difficulty) {
        case "EASY":
          publicQuestsPoints += 10;
          break;
        case "MEDIUM":
          publicQuestsPoints += 25;
          break;
        case "HARD":
          publicQuestsPoints += 50;
          break;
        default:
          publicQuestsPoints += 0;
      }

      if (mentor) {
        publicQuestsPoints += 10;
      }
    });

    let tasksPoints = 0;
    completedTasks.forEach((taskLog) => {
      tasksPoints += taskLog.gainedPoints;
    });

    const reactsPoints = receivedReacts.length * 5;
    const articlesPoints = currency.acceptedArticles * 20;
    const commentsPoints = currency.comments * 10;
    const totalPoints =
      reactsPoints + articlesPoints + commentsPoints + publicQuestsPoints;
    const x = 10;
    const level = parseInt(totalPoints / x, 10);
    const nextLevel = level + 1;
    const nextLevelLackingPoints = nextLevel * x - totalPoints;

    return res.json({
      totalPoints,
      tasksPoints,
      level,
      nextLevel,
      nextLevelLackingPoints,
    });
  } catch (err) {
    return res.status(500).send();
  }
}
