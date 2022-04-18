import { PartyMemberRole } from "@prisma/client";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { oopValidations } from "../../../../../validations/partyMember";
import withQuestProtect from "../../../../../middlewares/withQuestProtect";

async function fetchPartyMembers(req, res) {
  const { questId, memberId, excludeMentor, includePoints } = req.query;

  const searchObj = {
    questId: Number(questId),
    userId: memberId,
  };
  if (excludeMentor === "true")
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
            image: true,
            isActive: true,
            role: true,
          },
        },
      },
    });
    if (includePoints === "true") {
      const mapped = partyMembers.map((item) => item.partyMemberId);
      const points = await prisma.pointsLog.groupBy({
        by: ["partyMemberId"],
        _sum: {
          gainedPoints: true,
        },
        where: {
          partyMemberId: {
            in: mapped,
          },
        },
      });
      partyMembers.forEach((item) => {
        const foundInPointsLog = points.findIndex(
          (element) => element.partyMemberId === item.partyMemberId,
        );
        if (foundInPointsLog !== -1) {
          /* eslint-disable-next-line no-param-reassign, no-underscore-dangle */
          item.points = points[foundInPointsLog]._sum.gainedPoints;
          return item;
        }
        // eslint-disable-next-line no-param-reassign
        item.points = 0;
        return item;
      });
      partyMembers.sort(
        // eslint-disable-next-line no-underscore-dangle
        (a, b) => b.points - a.points,
      );
    }
    return res.status(200).send(partyMembers);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

async function addPartyMember(req, res) {
  try {
    const { user } = await getSession({ req });
    const { outcome, obstacle, plan } = req.body;
    const { questId } = req.query;
    await oopValidations.validate({ ...req.body });
    const existingPartyMember = await prisma.partyMember.findFirst({
      where: {
        userId: user.userId,
        questId: Number(questId),
      },
    });
    if (existingPartyMember) return res.status(200).json(existingPartyMember);

    const partyMember = await prisma.partyMember.create({
      data: {
        outcome,
        obstacle,
        plan,
        role: user.role === "mentor" ? "MENTOR" : "MENTEE",
        questId: Number(questId),
        userId: user.userId,
      },
    });
    return res.status(200).json(partyMember);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return withQuestProtect(fetchPartyMembers, req, res, [
        "MENTOR",
        "MENTEE",
        "PARTY_LEADER",
      ]);
    case "POST":
      return addPartyMember(req, res);
    default:
      return res.status(404).send();
  }
}
