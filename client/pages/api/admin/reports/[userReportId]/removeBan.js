import nodemailer from "nodemailer";
import prisma from "../../../../../lib/prisma";

export default async function approveReport(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const getUser = await prisma.user.findUnique({
      where: {
        userId: req.body.userId,
      },
    });
    const transactions = [];
    const removeBan = prisma.UserReport.update({
      where: {
        userReportId: Number(req.query.userReportId),
      },
      data: {
        status: "INACTIVE",
        banEnd: new Date(),
        deletedAt: new Date(),
      },
    });
    transactions.push(removeBan);
    const updateUserBan = prisma.user.update({
      where: {
        userId: req.body.userId,
      },
      data: {
        isBanned: false,
      },
    });
    transactions.push(updateUserBan);
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
      subject: `User Report Status`,
      html: `<div>
      Greetings ${getUser.displayName}! We are pleased to inform you that your account ban has been lifted. You may
      now continue using the Quests application.

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
