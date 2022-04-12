import prisma from "../../../../../lib/prisma";

export default async function rejectApplication(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const rejectedUser = await prisma.user.update({
      where: {
        userId: req.query.mentorId,
      },
      data: {
        isActive: "2", // "2" for now since not sure how to handle rejected. Basta I know it can't be zero.
        updatedAt: new Date(),
      },
    });
    return res.status(200).json(rejectedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
