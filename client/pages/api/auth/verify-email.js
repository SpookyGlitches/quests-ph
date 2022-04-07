import nodemailer from "nodemailer";
import prisma from "../../../lib/prisma";
// eslint-disable-next-line
export default async function (req, res) {
  if (req.method === "POST") {
    const userDetails = JSON.parse(req.body);
    const findToken = await prisma.user.findFirst({
      where: {
        email: userDetails.email,
      },
    });
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
      to: userDetails.email,
      subject: `Verification`,
      html: `<div>
        This is an automated reply from Quests App University of San Carlos. Please do not reply.
        You are receiving this email because your email was just registered to an account on Quests.
        Verify your account through this <a href="${process.env.NEXTAUTH_URL}/verify/${findToken.token}">link</a>.

    <div>`,
    };

    await transporter.sendMail(mailData, (err, info) => {
      if (err) console.log(err);
      else console.log(info);
    });
    res.status(200).send({ message: "Success!" });
  }
}
