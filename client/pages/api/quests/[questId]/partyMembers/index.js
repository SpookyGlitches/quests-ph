import { PartyMemberRole } from "@prisma/client";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import {
  oopValidations,
  roleValidation,
} from "../../../../../validations/partyMember";

async function fetchPartyMembers(req, res) {
  const searchObj = {
    questId: Number(req.query.questId),
  };

  if (req.query.memberId) searchObj.userId = req.query.memberId;
  if (req.query.excludeMentor)
    searchObj.OR = [
      {
        role: PartyMemberRole.MENTEE,
      },
      {
        role: PartyMemberRole.PARTY_LEADER,
      },
    ];

  try {
    const partyMembers = await prisma.partyMember.findMany({
      where: searchObj,
      include: {
        user: {
          select: {
            displayName: true,
            userId: true,
          },
        },
      },
    });
    return res.status(200).json(partyMembers);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

async function addPartyMember(req, res) {
  try {
    const { user } = await getSession({ req });
    const { outcome, obstacle, plan, role } = req.body;
    console.log(req.body);
    await oopValidations.concat(roleValidation).validate({ ...req.body });
    const partyMember = await prisma.partyMember.create({
      data: {
        userId: user.userId,
        outcome,
        obstacle,
        plan,
        questId: Number(req.query.questId),
        role,
      },
    });
    res.status(200).json(partyMember);
  } catch (error) {
    res.status(500).send();
    console.error(error);
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return fetchPartyMembers(req, res);
    case "POST":
      return addPartyMember(req, res);
    default:
      return res.status(404).send();
  }
}
