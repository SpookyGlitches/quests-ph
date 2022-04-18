import nodemailer from "nodemailer";
import prisma from "../../../../../lib/prisma";

export default async function approveApplication(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const getUser = await prisma.user.findFirst({
      where: {
        userId: req.query.mentorId,
      },
    });
    const transactions = [];
    const approvedUser = prisma.user.update({
      where: {
        userId: req.query.mentorId,
      },
      data: {
        isActive: "1",
        updatedAt: new Date(),
      },
    });
    transactions.push(approvedUser);
    const setDeletedAtFile = prisma.mentorFile.updateMany({
      where: {
        mentorUploadId: req.query.mentorId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(setDeletedAtFile);
    const setDeletedAtApplication = prisma.mentorApplication.updateMany({
      where: {
        mentorId: req.query.mentorId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(setDeletedAtApplication);

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
      subject: `Mentor Application`,
      html: `<div>
      Greetings, ${getUser.displayName}!
        This is an automated reply from Quests App University of San Carlos. Please do not reply.
        We are pleased to inform you that you have been approved as a mentor for Quests! You can now receive
        mentor requests from our members. Congratulations and well done!
    <div>`,
    };
    await prisma.$transaction(transactions);
    await transporter.sendMail(mailData);
    return res.status(200).json(approvedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
