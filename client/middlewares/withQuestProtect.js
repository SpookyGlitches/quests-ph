import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";

const withQuestProtect = async (handler, req, res, allowedRoles) => {
  try {
    const { user } = await getSession({ req });
    const parsedQuestId = Number(req.query.questId) || -1;
    const partyMember = await prisma.partyMember.findFirst({
      where: {
        questId: parsedQuestId,
        userId: user.userId,
        deletedAt: null,
      },
    });

    if (partyMember && allowedRoles.includes(partyMember.role)) {
      const { partyMemberId } = partyMember;
      if (req.body) req.body = { ...req.body, partyMember: { partyMemberId } };
      else req.body = { partyMember: { partyMemberId } };
      return handler(req, res);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
};

export default withQuestProtect;
