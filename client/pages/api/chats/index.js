// import { prisma } from "../../../lib/prisma";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getAllConversation(req, res) {
  if (req.method === "GET") {
    const { searchVal } = req.body;

    const conversations = await prisma.conversation.findMany();

    return res.status(200).json(conversations);
  }
}
