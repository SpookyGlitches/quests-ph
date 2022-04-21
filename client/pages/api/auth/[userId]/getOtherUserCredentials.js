import prisma from "../../../../lib/prisma";

export default async function getUserCredential(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        userId: req.query.userId,
      },
      select: {
        fullName: true,
        displayName: true,
        dateOfBirth: true,
        email: true,
        userId: true,
        role: true,
      },
    });
    return res.status(200).json(foundUser);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
}
