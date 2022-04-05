// import prisma from "../../../../../../../lib/prisma";
import withQuestProtect from "../../../../../../../middlewares/withQuestProtect";

async function addReact(req, res) {
  try {
    // const { type } = req.body;
    // const postReact = await prisma.postReact.create({
    //   data: {
    //     type,
    //     postId: Number(req.query.postId),
    //     // todo user id
    //   },
    // });
    console.log(req.query);
    return res.json({});
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
