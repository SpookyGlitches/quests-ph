import prisma from "../../../lib/prisma";

export default async function getFriendInformation(req, res) {
  if (req.method === "GET") {
    try {
      const getUserInfo = await prisma.user.findFirst({
        where: {
          displayName: req.query.displayName,
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
