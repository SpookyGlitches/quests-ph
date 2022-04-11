import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function acceptMentorRequests(req, res) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not allowed " });
  }
  const { user } = await getSession({ req });
  try {
    // console.log(req.body.questId);
    const acceptRequest = await prisma.questMentorshipRequest.update({
      where: {
        questMentorshipRequestId: req.body.questMentorshipRequestId,
      },
      data: {
        updatedAt: new Date(),
      },
    });
    let returnValue = acceptRequest;
    if (acceptRequest) {
      const createPartyMember = await prisma.partyMember.create({
        data: {
          userId: user.userId,
          questId: req.body.questId,
          role: "MENTOR",
          outcome: "", // default value if via accept
          obstacle: "", // default value if via accept
          plan: "", // default value if via accept
          createdAt: new Date(),
        },
      });
      returnValue = createPartyMember;
    } else {
      res.status(400).json({ message: "Could not confirm mentor request" });
    }
    return res.status(200).json(returnValue);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
}
