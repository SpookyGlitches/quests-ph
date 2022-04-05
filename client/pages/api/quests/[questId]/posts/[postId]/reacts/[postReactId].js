import prisma from "../../../../../../../lib/prisma";
import withQuestProtect from "../../../../../../../middlewares/withQuestProtect";

async function editReact(req, res) {
  try {
    const { type } = req.body;
    const postReact = await prisma.postReact.update({
      data: {
        type,
      },
      where: {
        postReactId: Number(req.query.postReactId),
      },
    });
    console.log(req.query);
    return res.json(postReact);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      return withQuestProtect(editReact, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);
    default:
      return res.status(405).send();
  }
}
