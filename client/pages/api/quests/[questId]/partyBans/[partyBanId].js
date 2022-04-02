import prisma from "../../../../../lib/prisma";
import withQuestProtect from "../../../../../middlewares/withQuestProtect";

async function revokeQuestPartyBan(req, res) {
  try {
    const partyBan = await prisma.questPartyBan.delete({
      where: {
        questPartyBanId: Number(req.query.partyBanId),
      },
    });
    return res.status(200).json(partyBan);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      return withQuestProtect(revokeQuestPartyBan, req, res, ["PARTY_LEADER"]);
    default:
      return res.status(405).send();
  }
}
