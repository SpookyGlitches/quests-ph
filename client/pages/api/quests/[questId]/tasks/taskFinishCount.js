import { getSession } from "next-auth/react";

import prisma from "../../../../../lib/prisma";

export default async function getTaskCount(req, res) {
  if (req.method !== "GET") {
    return res.status(400).send();
  }

  const { user } = await getSession({ req });

  const doneCount = await prisma.questTaskFinisher.count({
    where: {
      questId: Number(req.query.questId),
      userId: user.userId,
    },
  });

  return res.status(200).send(doneCount);
}
