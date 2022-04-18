import nodemailer from "nodemailer";
import prisma from "../../../lib/prisma";
// eslint-disable-next-line
export default async function (req, res) {
  if (req.method === "POST") {
    const userDetails = req.body.email;
    const findToken = await prisma.user.findFirst({
      where: {
        email: userDetails,
        deletedAt: null,
      },
    });
    if (findToken) {
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
        to: userDetails,
        subject: `Verification`,
        html: `<div>
          This is an automated reply from Quests App University of San Carlos. Please do not reply.
          You are receiving this email because your email was just registered to an account on Quests.
          Verify your account through this <a href="${process.env.NEXTAUTH_URL}/verify/${findToken.token}">link</a>.

      <div>`,
      };
      await transporter.sendMail(mailData);
      res.status(200).send({ message: "Success!" });
    } else {
      res.status(400).send({ message: "Email doesn't exist" });
    }

    await prisma.$disconnect();
  }
}
