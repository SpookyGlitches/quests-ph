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

  res.status(200).send(createMentorshipRequest);

  await prisma.$disconnect();
}

async function checkAvailQuest(req, res) {
  try {
    const checkAvail = await prisma.questMentorshipRequest.findMany({
      where: {
        questId: Number(req.query.questMentored),
        status: "ACTIVE",
      },
    });

    res.status(200).send(checkAvail);
  } catch (err) {
    res.status(400).send({ message: "Error" });
  }

  await prisma.$disconnect();
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
