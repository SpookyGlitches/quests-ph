import prisma from "../../../../../lib/prisma";

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
      return revokeQuestPartyBan(req, res);
    default:
      return res.status(405).send();
  }
}
