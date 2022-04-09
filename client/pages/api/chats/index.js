import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function getAllConversation(req, res) {
  if (req.method === "GET") {
    const { user } = await getSession({ req });
    const conversations =
      await prisma.$queryRaw`select C.conversationId, CM.userId,  C.createdAt, C.name
      FROM Conversation AS C
      INNER JOIN ConversationMember AS CM 
      ON C.conversationId = CM.conversationId
       WHERE CM.userId <>  ${user.userId} 
    ORDER BY C.createdAt DESC`;

    return res.status(200).json(conversations);
  }
}
