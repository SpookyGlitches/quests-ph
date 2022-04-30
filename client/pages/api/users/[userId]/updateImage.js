import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send();
  }
  try {
    const { user } = await getSession({ req });
    await prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        image: req.body.image,
      },
    });
    return res.status(200).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
