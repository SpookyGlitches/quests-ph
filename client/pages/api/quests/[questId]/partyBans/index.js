import prisma from "../../../../../lib/prisma";
import withQuestProtect from "../../../../../middlewares/withQuestProtect";

async function getQuestPartyBans(req, res) {
  try {
    const { questId } = req.query;
    const partyBans = await prisma.questPartyBan.findMany({
      where: {
        questId: Number(questId),
      },
      include: {
        user: {
          select: {
            userId: true,
            displayName: true,
            image: true,
          },
        },
      },
    });
    return res.status(200).json(partyBans);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

async function banPartyMember(req, res) {
  try {
    const { questId } = req.query;
    const { userId } = req.body;
    const parsedQuestId = Number(questId) || -1;
    const existingBan = await prisma.questPartyBan.findFirst({
      where: {
        questId: parsedQuestId,
        userId,
      },
    });
    if (existingBan) return res.status(200).send(existingBan);
    const removeMemberOperation = prisma.partyMember.deleteMany({
      where: {
        questId: parsedQuestId,
        userId,
      },
    });
    const banMemberOperation = prisma.questPartyBan.create({
      data: {
        questId: parsedQuestId,
        userId,
      },
    });
    await prisma.$transaction([removeMemberOperation, banMemberOperation]);
    return res.status(200).send(removeMemberOperation);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return withQuestProtect(getQuestPartyBans, req, res, ["PARTY_LEADER"]);
    case "POST":
      return withQuestProtect(banPartyMember, req, res, ["PARTY_LEADER"]);
    default:
      return res.status(405).send();
  }
}
