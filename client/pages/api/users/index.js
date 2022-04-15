import prisma from "../../../lib/prisma";

async function getUsers(req, res) {
  try {
    const { skip, take, role, search } = req.query;
    const parsedTake = Number(take) || undefined;
    const parsedSkip = parsedTake * Number(skip) || undefined;
    const users = await prisma.user.findMany({
      where: {
        NOT: [{ role: "admin" }],
        role,
        displayName: {
          search: search || undefined,
        },
        fullName: {
          search: search || undefined,
        },
      },
      select: {
        userId: true,
        displayName: true,
        fullName: true,
        image: true,
        role: true,
      },
      skip: parsedSkip,
      take: parsedTake,
    });
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);
    default:
      return res.status(405).send();
  }
}
