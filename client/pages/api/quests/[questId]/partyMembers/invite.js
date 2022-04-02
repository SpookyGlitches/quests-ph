import jwt from "jsonwebtoken";
import prisma from "../../../../../lib/prisma";
import withQuestProtect from "../../../../../middlewares/withQuestProtect";

async function generateInviteLink(req, res) {
  try {
    const { questId } = req.query;
    const parsedQuestId = Number(questId) || -1;
    const quest = await prisma.quest.findUnique({
      where: {
        questId: Number(questId) || -1,
      },
      select: {
        wish: true,
      },
    });
    const token = jwt.sign(
      { questId: parsedQuestId, wish: quest.wish },
      process.env.INVITE_PARTY_MEMBER_SECRET_KEY,
      { expiresIn: "15m" },
    );
    res.send(`${process.env.NEXTAUTH_URL}/quests/join?token=${token}`);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return withQuestProtect(generateInviteLink, req, res, ["PARTY_LEADER"]);
    default:
      return res.status(405).send();
  }
}
