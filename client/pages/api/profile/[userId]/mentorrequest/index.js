import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
// eslint-disable-next-line
async function createRequest(req, res) {
  const { user } = await getSession({ req });
  const createMentorshipRequest = await prisma.questMentorshipRequest.create({
    data: {
      partyLeaderId: user.userId,
      mentorId: req.query.userId,
      questId: Number(req.body.questMentored),
    },
  });

  return res.status(200).send(createMentorshipRequest);
}

async function checkAvailQuest(req, res) {
  try {
    // check if request has been submitted but not yet approved/rejected
    const checkAvail = await prisma.questMentorshipRequest.findFirst({
      where: {
        questId: Number(req.query.questMentored),
        status: "ACTIVE",
        updatedAt: null,
        deletedAt: null,
      },
    });

    const checkHasMentor = await prisma.partyMember.findFirst({
      where: {
        role: "MENTOR",
        questId: Number(req.query.questMentored),
        deletedAt: null,
      },
      select: {
        partyMemberId: true,
      },
    });

    return res
      .status(200)
      .send({ avail: checkAvail, hasMentor: checkHasMentor });
  } catch (err) {
    return res.status(400).send({ message: "Error" });
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    await checkAvailQuest(req, res);
  } else if (req.method === "POST") {
    await createRequest(req, res);
  } else {
    res.status(405).send();
  }
}
