import prisma from "../../../../lib/prisma";

export default async function getAllUsers(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
        NOT: {
          role: "admin",
        },
      },

      select: {
        userId: true,
        displayName: true,
        fullName: true,
        email: true,
        role: true,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
