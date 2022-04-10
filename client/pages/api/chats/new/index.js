import prisma from "../../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { user } = await getSession({ req });
  if (req.method === "GET") {
    const { user } = await getSession({ req });

    const usersCanChatWith =
      await prisma.$queryRaw`SELECT userId, displayName, fullName FROM user WHERE userId != ${user.userId} AND userId NOT IN  
      (SELECT userId from conversationmember WHERE userId !=${user.userId} AND conversationId IN                      
        (SELECT conversationId FROM conversationmember where userId = ${user.userId} AND deletedAt IS NULL))`;

    /*
    Description of each SELECT statement in the raw query (per row):
    This gets the user credentials of the users that the currently logged in user does not have an existing conversation room with.
    This selects the userId from the conversation room that is paired with the id of the currently logged in user.
    This gets the conversationIds of the currently logged in user.
    */

    res.status(200).json(usersCanChatWith);
  }
}
