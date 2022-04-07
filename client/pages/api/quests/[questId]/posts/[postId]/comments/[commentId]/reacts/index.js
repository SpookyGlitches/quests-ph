import prisma from "../../../../../../../../../lib/prisma";
import withQuestProtect from "../../../../../../../../../middlewares/withQuestProtect";

async function addReact(req, res) {
  try {
    const { type, partyMember } = req.body;
    const { commentId } = req.query;
    const parsedCommentId = Number(commentId);
    const existingReact = await prisma.commentReact.findFirst({
      where: {
        partyMemberId: partyMember?.partyMemberId,
        commentId: parsedCommentId,
      },
    });
    if (existingReact) return res.status(403).send();

    const commentReact = await prisma.commentReact.create({
      data: {
        type,
        partyMemberId: partyMember.partyMemberId,
        commentId: parsedCommentId,
      },
    });
    return res.json(commentReact);
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
