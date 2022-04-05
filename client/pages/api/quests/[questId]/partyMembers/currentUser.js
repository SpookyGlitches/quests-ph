import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { user } = await getSession({ req });
      const partyMember = await prisma.partyMember.findFirst({
        where: {
          userId: user.userId,
          questId: Number(req.query.questId) || null,
          deletedAt: null,
        },
        rejectOnNotFound: true,
      });
      return res.json(partyMember);
    } catch (error) {
      switch (error.constructor) {
        default:
          return res.status(404).send();
      }
    }
  } else {
    return res.status(405).send();
  }
}
