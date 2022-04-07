import prisma from "../../../../../../../lib/prisma";
import withQuestProtect from "../../../../../../../middlewares/withQuestProtect";

async function addReact(req, res) {
  try {
    const { type, partyMember } = req.body;
    const { postId } = req.query;
    const parsedPostId = Number(postId);
    const existingReact = await prisma.postReact.findFirst({
      where: {
        partyMemberId: partyMember.partyMemberId,
        postId: parsedPostId,
      },
    });

    if (existingReact) return res.status(400).send();

    const post = await prisma.post.findUnique({
      where: {
        postId: parsedPostId,
      },
      select: {
        partyMemberId: true,
      },
      rejectOnNotFound: true,
    });

    const transactions = [];

    const postReactOperation = prisma.postReact.create({
      data: {
        type,
        partyMemberId: partyMember?.partyMemberId,
        postId: parsedPostId,
      },
    });
    transactions.push(postReactOperation);

    if (post.partyMemberId !== partyMember.partyMemberId) {
      // do not award when a post author reacts on their own post
      const awardPointsOperation = prisma.pointsLog.create({
        data: {
          partyMemberId: post.partyMemberId,
          gainedPoints: 5,
          action: "RECEIVED_POST_REACT",
        },
      });
      transactions.push(awardPointsOperation);
    }
    const [postReact] = await prisma.$transaction(transactions);

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
