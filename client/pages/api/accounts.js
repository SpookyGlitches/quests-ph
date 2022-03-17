import prisma from "../../lib/prisma";
// eslint-disable-next-line
export default async function (req, res) {
  if (req.method === "POST") {
    //const data = req.body;
    //console.log(data);
    const userDetails = JSON.parse(req.body);
    console.log(userDetails.displayName);
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
    if (checkDisplayName) {
      //console.log("LMFAO");
      res.status(500).send();
    } else if (checkEmail) {
      //console.log("ur email oi");
      res.status(500).send();
    } else {
      //console.log("email available");
      // eslint-disable-next-line
      const userInfo = await prisma.user.create({ data: userDetails });
      await prisma.$disconnect();
      res.json([]);
    }
  }
}
