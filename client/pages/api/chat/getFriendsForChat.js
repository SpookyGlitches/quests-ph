// import axios from "axios";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getUserCredential(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });

    /* CODE FOR TALKJS API 
        const talkJsData = await axios.get(
          `https://api.talkjs.com/v1/tvcbUw3n/users/${user.userId}/conversations`,
          {
            headers: {
              Authorization: "Bearer sk_test_NPBhbi9sSMV8aA6DnWhSkmKzxQpivO6p",
              "Content-Type": "application/json",
            },
          },
        );
        const userChatIds = [];
        for (let i = 0; i < talkJsData.data.data.length; i++) {
          userChatIds.push(talkJsData.data.data[i].id);
        }
        console.log(userChatIds);

        for (let i = 0; i < userChatIds.length; i++) {
          const talkJsDataChat = await axios.get(
            `https://api.talkjs.com/v1/tvcbUw3n/conversations/${userChatIds[i]}`,
            {
              headers: {
                Authorization: "Bearer sk_test_NPBhbi9sSMV8aA6DnWhSkmKzxQpivO6p",
                "Content-Type": "application/json",
              },
            },
          );
          console.log(talkJsDataChat.data.participants);
        }

        for (i = 0; i < userChatIds.length; i++) {
          axios.delete(
            `https://api.talkjs.com/v1/tvcbUw3n/conversations/${userChatIds[i]}`,
            {
              headers: {
                Authorization: "Bearer sk_test_NPBhbi9sSMV8aA6DnWhSkmKzxQpivO6p",
                "Content-Type": "application/json",
              },
            },
          );
        }
     */
    const foundUsers =
      await prisma.$queryRaw`SELECT userId, displayName, fullName, email, dateOfBirth, role, deletedAt FROM User WHERE userId IN (SELECT IF(userOneId!=${user.userId}, userOneId, userTwoId) AS friendId FROM Friendship WHERE (userOneId = ${user.userId} OR userTwoId = ${user.userId}) AND (Friendship.deletedAt IS NULL))`;

    return res.status(200).json(foundUsers);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
}
