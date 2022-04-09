import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import prisma from "../../../lib/prisma";
import { awardEarlyUser, isUserEarly } from "../../../helpers/earlyUser";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userInfo = JSON.parse(req.body);
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
      role: "mentor",
      token: tok,
      experience: userInfo.experience,
      detailedExperience: userInfo.detailedExperience,
      fileUpload: userInfo.fileUpload,
    };

    // eslint-disable-next-line
    const transporter = nodemailer.createTransport({
      port: process.env.MAIL_PORT,
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: true,
    });
    // eslint-disable-next-line
    const mailData = {
      from: process.env.SMTP_USER,
      to: userDetails.email,
      subject: `Verification`,
      html: `<div>
        This is an automated reply from Quests App University of San Carlos. Please do not reply.
        You are receiving this email because your email was just registered to an account on Quests.
        Verify your account through this <a href="${process.env.NEXTAUTH_URL}/verify/${userDetails.token}">link</a>.

    <div>`,
    };

    const checkEmail = await prisma.user.findUnique({
      where: {
        email: userDetails.email,
      },
    });
    const checkDisplayName = await prisma.user.findUnique({
      where: {
        displayName: userDetails.displayName,
      },
    });
    if (checkDisplayName && checkEmail) {
      res.status(400).send({ message: "Both" });
    } else if (checkDisplayName) {
      res.status(403).send({ message: "Display Name Exists" });
    } else if (checkEmail) {
      res.status(409).send({ message: "Email Exists" });
    } else if (!checkDisplayName && !checkEmail) {
      try {
        const userCreation = await prisma.user.create({
          data: {
            email: userDetails.email,
            dateOfBirth: userDetails.dateOfBirth,
            displayName: userDetails.displayName,
            fullName: userDetails.fullName,
            password: userDetails.password,
            role: userDetails.role,
            token: userDetails.token,
          },
        });
        // can assume user already exists here since it would throw an error if theyre not yet created at this point
        const transactions = [];

        const mentorCreation = prisma.mentorApplication.create({
          data: {
            mentorId: userCreation.userId,
            experience: userDetails.experience,
            detailedExperience: userDetails.detailedExperience,
          },
        });

        transactions.push(mentorCreation);

        // if (userDetails.fileUpload === 0) {
        //   return res.status(400).send({ message: "Upload files" });
        // }
        const filesLength = userDetails.fileUpload?.length || 0;

        for (let i = 0; i < filesLength; i++) {
          transactions.push(
            prisma.mentorFile.create({
              data: {
                mentorUploadId: userCreation.userId,
                path: userDetails.fileUpload[i].path,
              },
            }),
          );
        }

        // wow i can see my name haha
        const early = isUserEarly(userCreation.createdAt);
        if (early) {
          const [awardOperation, notificationOperation] = awardEarlyUser(
            userCreation.userId,
          );
          transactions.push(awardOperation);
          transactions.push(notificationOperation);
        }

        await prisma.$transaction(transactions);
        await transporter.sendMail(mailData);

        res.status(200).send({ message: "Success" });
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong" });
      }
    }
  }
}
