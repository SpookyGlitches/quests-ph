import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";

const withQuestProtect = async (handler, req, res, allowedRoles) => {
  const { user } = await getSession({ req });
  const parsedQuestId = Number(req.query.questId) || -1;
  const existingPartyMemberOperation = prisma.partyMember.findFirst({
    where: {
      questId: parsedQuestId,
      userId: user?.userId,
      deletedAt: null,
    },
  });

  const existingPartyBanOperation = prisma.questPartyBan.findFirst({
    where: {
      questId: parsedQuestId,
      userId: user?.userId,
    },
  });

  const [existingMember, existingBan] = await prisma.$transaction([
    existingPartyMemberOperation,
    existingPartyBanOperation,
  ]);

  if (existingBan) {
    return res.status(403).send();
  }

  if (existingMember && allowedRoles.includes(existingMember.role)) {
    req.body = { ...req.body, requester: existingMember };
    return handler(req, res);
  }

  return res.status(403).send();
};

export default withQuestProtect;
