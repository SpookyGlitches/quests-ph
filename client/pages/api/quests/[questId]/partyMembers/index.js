import { QuestRole } from "@prisma/client";
import prisma from "../../../../../lib/prisma";

async function fetchPartyMembers(req, res) {
  const searchObj = {
    questId: Number(req.query.questId),
  };

  if (req.query.memberId) searchObj.userId = req.query.memberId;
  if (req.query.excludeMentor)
    searchObj.OR = [
      {
        role: QuestRole.MENTEE,
      },
      {
        role: QuestRole.PARTY_LEADER,
      },
    ];

  try {
    const partyMembers = await prisma.partyMember.findMany({
      where: searchObj,
      include: {
        user: {
          select: {
            name: true,
            id: true,
            image: true,
          },
        },
      },
    });
    console.log(partyMembers);
    return res.status(200).json({ partyMembers });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return fetchPartyMembers(req, res);
    default:
      return res.sendStatus(404);
  }
}
