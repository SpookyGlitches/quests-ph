import prisma from "../../../lib/prisma";

export default async function userHandler(req, res) {
  if (req.method !== "GET") {
    return res.status(401).send();
  }
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        userId: req.query.userId,
      },
    });

    return res.status(200).json(userInfo);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "something went wrong" });
  }
}
