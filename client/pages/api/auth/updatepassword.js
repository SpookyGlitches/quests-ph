import bcrypt from "bcryptjs";
import prisma from "../../../lib/prisma";
// eslint-disable-next-line
export default async function (req, res) {
  if (req.method === "POST") {
    const userInfo = req.body;
    const salt = bcrypt.genSaltSync(10);
    const findUser = await prisma.user.findFirst({
      where: {
        userId: userInfo.userDetails.userId,
      },
    });
    if (findUser) {
      await prisma.user.update({
        where: {
          userId: findUser.userId,
        },
        data: {
          password: bcrypt.hashSync(userInfo.userDetails.password, salt),
        },
      });

      await prisma.forgotPassword.update({
        where: {
          forgotPasswordId: userInfo.userDetails.forgotPasswordId,
        },
        data: {
          isUsed: true,
        },
      });
    }
    res.status(200).send({ message: "Success!" });
  }

  await prisma.$disconnect();
}
