import prisma from "../../lib/prisma";
// eslint-disable-next-line
export default async function (req, res) {
  if (req.method === "POST") {
    const userDetails = JSON.parse(req.body);
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
      await prisma.user.create({ data: userDetails });
      res.status(200).send();
    } else if (checkDisplayName) {
      res.status(500).send({ message: "Username" });
    } else if (checkEmail) {
      res.status(400).send({ message: "Email" });
    }
    await prisma.$disconnect();
  }
}
