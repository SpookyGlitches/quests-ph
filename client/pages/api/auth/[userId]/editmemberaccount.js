import prisma from "../../../../lib/prisma";

export default async function editMemberAccount(req, res) {
  if (req.method === "PUT") {
    const userDetails = req.body;
    const rawDate = userDetails.dateOfBirth;
    const dateObj = new Date(rawDate);
    userDetails.dateOfBirth = dateObj.toISOString();

    // const checkEmail = await prisma.user.findMany({
    //   where: {
    //     email: userDetails.email,
    //     NOT: {
    //       userId: {
    //         equals: userDetails.userId,
    //       },
    //     },
    //   },
    // });

    const checkDisplayName = await prisma.user.findMany({
      where: {
        displayName: userDetails.displayName,
        NOT: {
          userId: {
            equals: userDetails.userId,
          },
        },
      },
    });

    if (checkDisplayName.length === 0) {
      const success = await prisma.user.update({
        where: { userId: userDetails.userId },
        data: userDetails,
      });

      if (success) {
        await prisma.user.update({
          where: { userId: userDetails.userId },
          data: { updatedAt: new Date().toISOString() },
        });
        res.status(200).send({ message: "Success!" });
      }
    } else if (Number(checkDisplayName.length) !== 0) {
      res
        .status(422)
        .send({ message: "Display Name is already used by different user" });
    }

    await prisma.$disconnect();
  }
}
