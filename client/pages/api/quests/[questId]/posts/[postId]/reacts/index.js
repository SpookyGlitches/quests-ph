import prisma from "../../../../../../../lib/prisma";
import withQuestProtect from "../../../../../../../middlewares/withQuestProtect";

async function addReact(req, res) {
  try {
    const { type, partyMember } = req.body;
    const { postId } = req.query;
    const existingReact = await prisma.postReact.findFirst({
      where: {
        partyMemberId: partyMember?.partyMemberId,
        postId: Number(postId),
      },
    });
    if (existingReact) return res.status(403).send();

    const postReact = await prisma.postReact.create({
      data: {
        type,
        partyMemberId: partyMember?.partyMemberId,
        postId: Number(postId),
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
