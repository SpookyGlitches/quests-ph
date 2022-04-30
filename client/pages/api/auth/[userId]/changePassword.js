import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";
// eslint-disable-next-line consistent-return
export default async function changePassword(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  if (req.method === "PUT") {
    const userDetails = req.body;
    const newPass = userDetails.password;
    const salt = bcrypt.genSaltSync(10);

    const submittedPassword = bcrypt.hashSync(newPass, salt);
    const foundUser = await prisma.user.findUnique({
      where: {
        userId: userDetails.userId,
      },
      select: {
        fullName: true,
      },
    });

    if (foundUser) {
      const success = await prisma.user.update({
        where: { userId: userDetails.userId },
        data: { password: submittedPassword },
      });

      if (success) {
        await prisma.user.update({
          where: { userId: userDetails.userId },
          data: { updatedAt: new Date().toISOString() },
        });
        return res.status(200).send({ message: "Success!" });
      }
    } else {
      return res.status(400).json({ message: "User not found." });
    }
    await prisma.$disconnect();
  }
}
