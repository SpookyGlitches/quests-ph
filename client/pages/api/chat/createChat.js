import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function createChat(req, res) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });
    const newConvo = await prisma.conversation.create({
      data: {
        questId: null,
        name: "Another",
      },
    });
    let returnValue = newConvo;
    console.log(newConvo);
    if (newConvo) {
      console.log(newConvo.conversationId);
      const newMembers = await prisma.ConversationMember.createMany({
        data: [
          {
            conversationId: newConvo.conversationId,
            userId: user.userId,
          },
          {
            conversationId: newConvo.conversationId,
            userId: "cl1n3cng20025vktau8t64hkp",
          },
        ],
      });
      returnValue = newMembers;
      if (newMembers) {
        console.log("Naay mimbers");
      } else {
        console.log("Wa say mimbers");
      }
    } else {
      console.log("Wa say convo dong");
      res.status(400).json({ message: "Could not confirm friend request" });
    }
    return res.status(200).json(returnValue);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
