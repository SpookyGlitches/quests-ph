//chat here subscribe to the channel
import { pusher } from "../../../../lib/pusher";
import { getSession } from "next-auth/react";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function sendMessageHandler(req, res) {
  if (req.method === "POST") {
    const { message, username } = req.body;

    const { user } = await getSession({ req });

    const msg = await prisma.message
      .create({
        data: {
          conversationId: Number(req.query.conversationId),
          userId: user.userId,
          text: message,
        },
      })
      .then((msg) => {
        pusher.trigger("presence-chat", "chat-send", {
          message: msg.text,
          username,
        });
      });

    res.status(200).json({ message: "sent" });
  }
}
async function getConversationChats(req, res) {
  const chats = await prisma.message.findMany({
    where: {
      conversationId: Number(req.query.conversationId),
    },
  });

  res.status(200).json({ chats });
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    await getConversationChats(req, res);
  } else if (req.method === "POST") {
    await sendMessageHandler(req, res);
  }
}
