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

    const comment = await prisma.comment.findUnique({
      where: {
        commentId: parsedCommentId,
      },
      select: {
        partyMemberId: true,
        partyMember: {
          select: {
            role: true,
          },
        },
      },
      rejectOnNotFound: true,
    });

    const transactions = [];
    const commentReactOperation = prisma.commentReact.create({
      data: {
        type,
        partyMemberId: partyMember.partyMemberId,
        commentId: parsedCommentId,
      },
    });

    transactions.push(commentReactOperation);

    if (
      comment.partyMemberId !== partyMember.partyMemberId &&
      comment.partyMember.role !== "MENTOR"
    ) {
      // do not award when a post author comments on their own post and mentors
      const awardPointsOperation = prisma.pointsLog.create({
        data: {
          partyMemberId: comment.partyMemberId, // the one who created the comment
          gainedPoints: 1,
          action: "RECEIVED_COMMENT_REACT",
        },
      });
      transactions.push(awardPointsOperation);
    }

    const [react] = await prisma.$transaction(transactions);

    return res.json(react);
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
