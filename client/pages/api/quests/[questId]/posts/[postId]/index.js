import prisma from "../../../../../../lib/prisma";

async function getPost(req, res) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        postId: Number(req.query.postId),
      },
      select: {
        createdAt: true,
        title: true,
        postId: true,
        body: true,
        updatedAt: true,
        partyMemberId: true,
        partyMember: {
          select: {
            userId: true,
            user: {
              select: {
                displayName: true,
                image: true,
                fullName: true,
              },
            },
            quest: {
              select: {
                completedAt: true,
              },
            },
            partyMemberId: true,
          },
        },
        comments: {
          where: {
            deletedAt: null,
          },
          select: {
            deletedAt: true,
          },
        },
        postFiles: {
          select: {
            key: true,
            postFileId: true,
          },
          where: {
            deletedAt: null,
          },
        },
        postReacts: {
          where: {
            deletedAt: null,
            partyMember: {
              deletedAt: null,
              user: {
                deletedAt: null,
              },
            },
          },
          select: {
            postReactId: true,
            type: true,
            partyMember: {
              select: {
                user: {
                  select: {
                    userId: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return res.status(200).send(post);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

async function editPost(req, res) {
  try {
    const { title, body, files } = req.body;
    const post = await prisma.post.update({
      where: {
        postId: Number(req.query.postId),
      },
      data: {
        title,
        body,
        postFiles: {
          connect: files,
        },
      },
    });
    return res.status(200).send(post);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

async function deletePost(req, res) {
  try {
    const { postId } = req.query;
    await prisma.post.update({
      where: {
        postId: Number(postId),
      },
      data: {
        deletedAt: new Date(),
        postFiles: {
          updateMany: {
            data: {
              deletedAt: new Date(),
            },
            where: {},
          },
        },
      },
    });
    res.status(200).send();
  } catch (err) {
    console.log(err.message);
    res.status(500).send();
  }
}
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getPost(req, res);
    case "PUT":
      return editPost(req, res);
    case "DELETE":
      return deletePost(req, res);
    default:
      return res.status(405).send();
  }
}
