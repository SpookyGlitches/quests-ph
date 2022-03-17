import prisma from "../../../../lib/prisma";

async function getQuest(req, res) {
  try {
    const quest = await prisma.quest.findUnique({
      where: {
        id: Number(req.query.questId),
      },
    });
    res.status(200).json({ quest });
  } catch (err) {
    console.log(err);
    res.status(404).json({});
  }
}
async function updateQuest(req, res) {
  try {
    const { startDate, endDate, difficulty, visibility, category, wish } =
      req.body;
    const quest = await prisma.quest.update({
      where: {
        id: Number(req.query.questId),
      },
      data: {
        estimatedEndDate: endDate,
        estimatedStartDate: startDate,
        difficulty,
        visibility,
        category,
        wish,
      },
    });
    res.status(200).send({ quest });
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
}

async function deleteQuest(req, res) {
  try {
    // https://github.com/prisma/prisma/issues/3398
    const { questId } = req.query;
    const questDelete = prisma.quest.delete({
      where: {
        id: Number(questId),
      },
    });
    const memberDelete = prisma.partyMember.deleteMany({
      where: {
        questId: Number(questId),
      },
    });
    await prisma.$transaction([questDelete, memberDelete]);
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    await getQuest(req, res);
  } else if (req.method === "PUT") {
    await updateQuest(req, res);
  } else if (req.method === "DELETE") {
    await deleteQuest(req, res);
  }
}
