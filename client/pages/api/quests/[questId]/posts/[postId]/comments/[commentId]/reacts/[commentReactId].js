import prisma from "../../../../../../../../../lib/prisma";
import withQuestProtect from "../../../../../../../../../middlewares/withQuestProtect";

async function deleteReact(req, res) {
  try {
    const { commentReactId } = req.query;
    const commentReact = await prisma.commentReact.delete({
      where: {
        commentReactId: Number(commentReactId),
      },
    });

    return res.json(commentReact);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

async function updateReact(req, res) {
  try {
    const { commentReactId } = req.query;
    const commentReact = await prisma.commentReact.update({
      where: {
        commentReactId: Number(commentReactId),
      },
      data: {
        type: req.body.type,
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
    case "DELETE":
      return withQuestProtect(deleteReact, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);
    case "PUT":
      return withQuestProtect(updateReact, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);

    default:
      return res.status(405).send();
  }
}
