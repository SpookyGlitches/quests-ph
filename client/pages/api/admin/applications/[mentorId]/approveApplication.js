import prisma from "../../../../../lib/prisma";

export default async function approveApplication(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const approvedUser = await prisma.user.update({
      where: {
        userId: req.query.mentorId,
      },
      data: {
        isActive: "1",
        updatedAt: new Date(),
      },
    });
    return res.status(200).json(approvedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
