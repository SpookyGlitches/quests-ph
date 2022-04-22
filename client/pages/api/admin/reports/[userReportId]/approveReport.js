import nodemailer from "nodemailer";
import prisma from "../../../../../lib/prisma";

export default async function approveReport(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const obj = JSON.stringify(req.body.duration);
    const num = Number(obj.charAt(obj.length - 2));

    const transactions = [];
    const getUser = await prisma.user.findUnique({
      where: {
        userId: req.body.recipient,
      },
    });
    const updateUser = prisma.user.update({
      where: {
        userId: req.body.recipient,
      },
      data: {
        isBanned: true,
      },
    });

    transactions.push(updateUser);
    const approvedReport = prisma.UserReport.update({
      where: {
        userReportId: Number(req.query.userReportId),
      },
      data: {
        status: "ACTIVE",
        banStart: new Date(),
        banEnd: new Date(Date.now() + num * 24 * 60 * 60 * 1000),
      },
    });
    transactions.push(approvedReport);

    const transporter = nodemailer.createTransport({
      port: process.env.MAIL_PORT,
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: true,
    });
    const mailData = {
      from: process.env.SMTP_USER,
      to: getUser.email,
      subject: `User Report`,
      html: `<div>
          Greetings ${getUser.displayName}! We have recently received a report about your account. Here in Quests,
          our users' welfare is one of the most important things we consider here. After careful review of the report
          made against you, we have decided to temporarily ban your account for ${num} days. You will be unable to
          access your account within ${num} days. However, you may log in after the said number of days.

          Thank you and have a great day!

    <div>`,
    };

    await prisma.$transaction(transactions);
    await transporter.sendMail(mailData);
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
