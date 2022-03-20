import prisma from "../../../lib/prisma";
// eslint-disable-next-line
export default async function (req, res) {
  // eslint-disable-next-line
  require("dotenv").config();

  if (req.method === "POST") {
    const userDetails = JSON.parse(req.body);
    // const fileLength = userDetails.fileUpload.length;
    // console.log(fileLength);
    // eslint-disable-next-line
    const nodemailer = require("nodemailer");
    // eslint-disable-next-line
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
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
        Verify your account through this link. http://localhost:3000/verify/${userDetails.token}

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
    if (!checkDisplayName && !checkEmail) {
      // eslint-disable-next-line
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
      if (userCreation) {
        const findUser = await prisma.user.findFirst({
          where: {
            email: userDetails.email,
          },
        });
        if (findUser) {
          console.log("olalala");
          // eslint-disable-next-line
          const fileCreation = await prisma.mentorFiles.create({
            data: {
              uploadId: findUser.id,
              path: "wahahaha",
            },
          });

          if (fileCreation) {
            console.log("yawa");
          }
        }
      }
      // if (userCreation) {
      //   console.log("user created");
      //   const findUser = await prisma.user.findFirst({
      //     where: {
      //       email: userDetails.email,
      //     },
      //   });
      //   if (findUser) {
      //     console.log("user found");
      //     const mentorCreation = await prisma.mentorApplication.create({
      //       data: {
      //         userId: findUser.id,
      //         experience: userDetails.experience,
      //         detailedExperience: userDetails.detailedExperience,
      //       },
      //     });
      //     if (mentorCreation) {
      //       console.log("mentor created");
      //       console.log(findUser.id);
      //       const fileCreation = await prisma.mentorfiles.create({
      //         data: {
      //           fileId: findUser.id,
      //           path: "wahahaha",
      //         },
      //       });
      //       // for (var i = 0; i < fileLength; i++) {
      //       //   console.log(i);
      //       //   const fileCreation = await prisma.mentorFiles.create({
      //       //     data: {
      //       //       fileId: findUser.id,
      //       //       path: userDetails.fileUpload[i].path,
      //       //     },
      //       //   });
      //       // }
      //       transporter.sendMail(mailData, (err, info) => {
      //         if (err) console.log(err);
      //         else console.log(info);
      //       });
      //       res.status(200).send();
      //     }
      //   }
      // }
    } else if (checkDisplayName) {
      res.status(500).send({ message: "Username" });
    } else if (checkEmail) {
      res.status(400).send({ message: "Email" });
    }
    await prisma.$disconnect();
  }
}
