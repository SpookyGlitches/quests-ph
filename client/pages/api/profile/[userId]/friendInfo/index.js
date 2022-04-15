import prisma from "../../../../../lib/prisma";

export default async function getFriendInfo(req, res) {
  if (req.method === "GET") {
    try {
      const getUserInfo = await prisma.user.findFirst({
        where: {
          userId: req.query.userId,
          deletedAt: null,
        },
      });

      return res.status(200).json(getUserInfo);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    return res.status(404).json({ message: "Method not allowed " });
  }
}
