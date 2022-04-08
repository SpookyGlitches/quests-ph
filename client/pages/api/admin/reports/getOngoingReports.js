import prisma from "../../../../lib/prisma";

export default async function getOngoingReports(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const reports = await prisma.UserReport.findMany({
      where: {
        status: "ACTIVE",
        deletedAt: null,
        NOT: [
          {
            banStart: null,
          },
        ],
      },
      select: {
        userReportId: true,
        recipientId: true,
        category: true,
        description: true,
        status: true,
        createdAt: true,
        banStart: true,
        banEnd: true,
      },
    });
    return res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
