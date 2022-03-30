import prisma from "../../../../../lib/prisma";

async function editWoopStatement(req, res) {
  try {
    const { outcome, obstacle, plan } = req.body;
    const partyMemberWoop = await prisma.partyMember.update({
      where: {
        partyMemberId: Number(req.query.memberId),
      },
      data: {
        outcome,
        obstacle,
        plan,
      },
    });
    return res.status(200).json(partyMemberWoop);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      return editWoopStatement(req, res);
    default:
      return res.status(404).send();
  }
}
