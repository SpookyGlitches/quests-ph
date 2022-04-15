import prisma from "../../../lib/prisma";

export default async function rejectMentorRequests(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const rejectRequest = await prisma.questMentorshipRequest.update({
      where: {
        questMentorshipRequestId: req.body.questMentorshipRequestId,
      },
      data: {
        status: "INACTIVE",
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });

    return res.status(200).json(rejectRequest);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
