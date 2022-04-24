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
      select: {
        partyMemberId: true,
        role: true,
      },
    });

    if (partyMember && allowedRoles.includes(partyMember.role)) {
      const { partyMemberId, role } = partyMember;
      if (req.body)
        req.body = { ...req.body, partyMember: { partyMemberId, role } };
      else req.body = { partyMember: { partyMemberId, role } };
      return handler(req, res);
    }
    return res.status(404).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

export default withQuestProtect;
