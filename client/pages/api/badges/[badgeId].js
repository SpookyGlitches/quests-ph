import prisma from "../../../lib/prisma";

export default async function badgeHandler(req, res) {
  if (req.method !== "GET") {
    return res.status(401).send();
  }
  try {
    const badgeInfo = await prisma.badge.findUnique({
      where: {
        badgeId: Number(req.query.badgeId),
      },
    });

    return res.status(200).json(badgeInfo);
  } catch (e) {
    return res.status(400).send({ message: "something went wrong" });
  }
}
