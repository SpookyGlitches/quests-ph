import prisma from "../../../../../../../lib/prisma";
import withQuestProtect from "../../../../../../../middlewares/withQuestProtect";

async function addReact(req, res) {
  try {
    const { type, partyMember } = req.body;

    const existingReact = await prisma.postReact.findFirst({
      where: {
        type,
        partyMemberId: partyMember?.partyMemberId,
        // deletedAt: null in middleware
      },
    });
    if (existingReact) return res.json(existingReact);

    const postReact = await prisma.postReact.create({
      data: {
        type,
        partyMemberId: partyMember?.partyMemberId,
        postId: Number(req.query.postId),
      },
    });
    return res.json(postReact);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return withQuestProtect(addReact, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);
    default:
      return res.status(405).send();
  }
}
