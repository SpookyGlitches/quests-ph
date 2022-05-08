import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../../lib/prisma";
import { awardEarlyUser, isUserEarly } from "../../../helpers/badges/earlyUser";
// eslint-disable-next-line
export default async function (req, res) {
  // eslint-disable-next-line

  if (req.method === "POST") {
    const userInfo = req.body.values;
    const rawDate = userInfo.dateOfBirth;
    const dateObj = new Date(rawDate);
    const bdate = dateObj.toISOString();
    const salt = bcrypt.genSaltSync(10);
    const tok = uuidv4();
    const userDetails = {
      email: userInfo.email,
      dateOfBirth: bdate,
      displayName: userInfo.displayName,
      fullName: userInfo.fullName,
      password: bcrypt.hashSync(userInfo.password, salt),
      role: "member",
    };

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
        Verify your account through this <a href="${process.env.NEXTAUTH_URL}/verify/${tok}">link</a>.

    <div>`,
    };

    const checkEmail = await prisma.user.findFirst({
      where: {
        email: userDetails.email,
        deletedAt: null,
      },
    });
    const checkDisplayName = await prisma.user.findFirst({
      where: {
        displayName: userDetails.displayName,
        deletedAt: null,
      },
    });
    if (checkDisplayName && checkEmail) {
      res.status(400).send({ message: "Both" });
    } else if (checkDisplayName) {
      res.status(403).send({ message: "Display Name Exists" });
    } else if (checkEmail) {
      res.status(409).send({ message: "Email Exists" });
    } else if (!checkDisplayName && !checkEmail) {
      const early = isUserEarly(new Date());
      const awardOperations = early ? awardEarlyUser() : undefined;

      // no need for pusher here
      await prisma.user.create({
        data: {
          ...userDetails,
          ...awardOperations,
          verificationToken: {
            create: {
              token: tok,
            },
          },
          userCurrency: {
            create: {
              acceptedArticles: 0,
              completedPublicQuests: 0,
              startedPublicQuests: 0,
              posts: 0,
              postReacts: 0,
              comments: 0,
            },
          },
        },
      });
      await transporter.sendMail(mailData);
      res.status(200).send({ message: "Success!" });
    }

    await prisma.$disconnect();
  }
}
