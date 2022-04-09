import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// Returns the conversationIds that the logged in user is part of.
async function getExistingChats(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }
  try {
    const { user } = await getSession({ req });
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
    // userChats returns in json format so I just got the ids and mapped it into retVal.
    if (userChats) {
      retVal = userChats.map((chat) => chat.conversationId);
    }

    return res.status(200).json(retVal);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// Redirects to chat with user if there's a new chat.
async function checkExistingChat(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }
  try {
    const { user } = await getSession({ req });
    console.log(user);
    /* Change lng the name to unsay name sa userId variable sa client
      (Ang id gibutang is for testing to see if it works. Replace with a 
       userId that you want to check if naay existing chat with.)
    */
    const userToChatWith = "cl1ncy1ca0008w0tabu40xnlz";
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
      const convoIds = userChats.map((chat) => chat.conversationId);

      let chatExists = false;
      /* Loops through each row in the conversation members table 
          based on the conversationIds (convoIds variable) of the logged in user.
          We go through each conversationId and look for the userIds, other than
          the already logged in user, and see if the user we want to start a new chat with
          already exists.
      */
      for (let i = 0; i < convoIds.length && chatExists === false; i++) {
        const queryRes = await prisma.ConversationMember.findFirst({
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
        // Checks if
        if (queryRes.userId === userToChatWith) {
          retVal = queryRes.conversationId;
          chatExists = true;
        }
        console.log(retVal);
      }
    }
    if (retVal) {
      return res.redirect(307, `/chats/${retVal}`);
    }
    return res.send(retVal); // Returns false meaning there's no convo with the user you want to chat with and the logged in user.
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

// Makes a new conversation row and adds the two users as the members.
async function createChat(req, res) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });

    const newConvo = await prisma.conversation.create({
      data: {
        questId: null,
        name: req.body.selectedValue, // Placeholder rapud. Idk unsay default and sht
      },
    });
    if (newConvo.conversationId !== null) {
      // Not sure if .length!==0 ang checking ani but since this works, kani lng sa for now.
      const newMembers = await prisma.ConversationMember.createMany({
        data: [
          {
            conversationId: newConvo.conversationId,
            userId: user.userId,
          },
          {
            conversationId: newConvo.conversationId,
            userId: req.body.selectedValue, // Made it static for now just to see if naay convo ma make
          },
        ],
      });
      if (newMembers.count > 1) {
        // Checks if there were two rows inserted (One for each member of the chat)
        const firstMessage = await prisma.message.create({
          data: {
            conversationId: newConvo.conversationId,
            userId: user.userId,
            text: req.body.message,
          },
        });
        return res.send(newConvo.conversationId);
      }
      return res
        .status(400)
        .json({ message: "Something wrong with populating chatroom" });
    }
    return res.status(400).json({ message: "Wa say convo dong" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Something went wrong in making a convo" });
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return checkExistingChat(req, res);
    case "POST":
      return createChat(req, res);
    default:
      return res.status(404).send();
  }
}
