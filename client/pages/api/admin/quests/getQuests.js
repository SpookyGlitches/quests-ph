import prisma from "../../../../lib/prisma";

export default async function getAllQuests(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    // const quests = await prisma.quest.findMany({
    //   where: {
    //     deletedAt: null,
    //     completedAt: null,
    //   },
    //   select: {
    //     questId: true,
    //     userId: true,
    //     wish: true,
    //     difficulty: true,
    //     visibility: true,
    //     category: true,
    //   },
    // });
    const quests =
      await prisma.$queryRaw`SELECT questId, User.fullName, wish, difficulty, visibility, category FROM User INNER JOIN Quest ON Quest.userId = User.userId WHERE Quest.completedAt IS NULL AND Quest.deletedAt IS NULL`;
    return res.status(200).json(quests);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
