import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function checkExistingChat(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });
    const userToChatWith = "cl1n3e9410036vkta5b0f0h7f";
    let retVal = false;
    const userChats = await prisma.ConversationMember.findMany({
      where: {
        userId: user.userId,
        deletedAt: null,
      },
      select: {
        conversationId: true,
      },
    });
    console.log(userChats);

    if (userChats.length !== 0) {
      // Holds ids of the person logged in's chats
      let convoIds = userChats.map((chat) => chat.conversationId);

      let chatExists = false;
      /* Loops through each row in the conversation members table 
        based on the conversationIds (convoIds variable) of the logged in user.
        We go through each conversationId and look for the userIds, other than
        the already logged in user, and see if the user we want to start a new chat with
        already exists.
      */
      for (let i = 0; i < convoIds.length && chatExists === false; i++) {
        let queryRes = await prisma.ConversationMember.findFirst({
          where: {
            conversationId: convoIds[i],
            NOT: {
              userId: user.userId,
            },
            deletedAt: null,
          },
          select: {
            userId: true,
            conversationId: true,
          },
        });
        console.log(i);

        if (queryRes.userId === userToChatWith) {
          retVal = queryRes.conversationId;
          chatExists = true;
        }
        console.log(retVal);
      }
    }
    if (retVal) return res.redirect(307, `/chats/${retVal}`);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
