import prisma from "../../../../../lib/prisma";
import withQuestProtect from "../../../../../middlewares/withQuestProtect";

async function updateMentorMessage(req, res) {
  try {
    await prisma.quest.update({
      where: {
        questId: Number(req.query.questId),
      },
      data: {
        mentorMessage: req.body.mentorMessage,
      },
    });
    return res.status(200).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  if (req.method === "PUT") {
    return withQuestProtect(updateMentorMessage, req, res, ["MENTOR"]);
  }
  return res.status(500).send();
}
