import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send();
  }
  const skip = Number(req.query.skip) || undefined;
  const take = Number(req.query.take) || undefined;
  try {
    const { user } = await getSession({ req });
    const associatedQuests = await prisma.partyMember.findMany({
      where: {
        userId: user.userId,
        deletedAt: null,
        quest: {
          deletedAt: null,
        },
      },
      select: {
        questId: true,
        partyMemberId: true,
      },
    });

    const questIds = associatedQuests.map((x) => x.questId);
    const posts = await prisma.post.findMany({
      where: {
        partyMember: {
          questId: {
            in: questIds,
          },
          deletedAt: null,
        },
        AND: [
          {
            OR: [
              {
                title: {
                  search: req.query.search,
                },
              },
              {
                body: {
                  search: req.query.search,
                },
              },
            ],
          },
        ],
      },
      skip: skip * take,
      take,
      select: {
        postId: true,
        partyMember: {
          select: {
            questId: true,
          },
        },
      },
    });
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
}
