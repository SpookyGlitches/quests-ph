import prisma from "../../../../lib/prisma";

export default async function getOngoingReports(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    // const reports = await prisma.UserReport.findMany({
    //   where: {
    //     status: "ACTIVE",
    //     deletedAt: null,
    //     NOT: [
    //       {
    //         banStart: null,
    //       },
    //     ],
    //   },
    //   select: {
    //     userReportId: true,
    //     recipientId: true,
    //     category: true,
    //     description: true,
    //     status: true,
    //     createdAt: true,
    //     banStart: true,
    //     banEnd: true,
    //   },
    // });
    const reports =
      await prisma.$queryRaw`SELECT userReportId, category, description, reporter.displayName AS reporterDisplayName, recipient.displayName AS recipientDisplayName, recipient.email AS recipientEmail, reporter.email AS reporterEmail, reporterId, recipientId, category, description, status, screenshot, UserReport.createdAt, SUBSTRING(banStart, 1, 10) AS banStart, SUBSTRING(banEnd, 1, 10) AS banEnd FROM UserReport INNER JOIN User reporter ON (reporter.userId = UserReport.reporterId) INNER JOIN User recipient ON (recipient.userId = UserReport.recipientId) WHERE status = "ACTIVE" AND UserReport.deletedAt IS NULL AND banEnd > NOW()`;
    return res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
