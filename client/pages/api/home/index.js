import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send();
  }

  const { take, skip, search } = req.query;
  const parsedTake = Number(take) || undefined;
  const parsedSkip = parsedTake * Number(skip) || undefined;

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
                body: {
                  search: search || undefined,
                },
              },
              {
                title: {
                  search: search || undefined,
                },
              },
            ],
          },
        ],
      },
      skip: parsedSkip,
      take: parsedTake,
      orderBy: {
        createdAt: "desc",
      },
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
