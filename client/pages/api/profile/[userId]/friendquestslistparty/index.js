// import { getSession } from "next-auth/react";
// import prisma from "../../../../../lib/prisma";

// export default async function GetFriendQuestsListInfo(req, res) {
//   function computeIfJoined(quests) {
//     const computed = quests.map((item) => {
//       return {
//         ...item,
//         isJoined: item.partyMembers && item.partyMembers.length !== 0,
//       };
//     });
//     return computed;
//   }

//   if (req.method === "GET") {
//     try {
//       const param = req.query.userId;
//       // console.log(param);
//       const { user } = await getSession({ req });
//       const questsPt = await prisma.partyMember.findMany({
//         where: {
//           userId: param,
//         },
//       });

//       // if a user is a party member, get the parties wherein logged in user is a member
//       const retVal = [];
//       if (questsPt) {
//         for (let x = 0; x < questsPt.length; x++) {
//           const partyLoggedIn = await prisma.quest.findMany({
//             where: {
//               questId: questsPt[x].questId,
//             },
//             include: {
//               partyMembers: {
//                 where: {
//                   userId: user.userId,
//                 },
//               },
//             },
//           });

//           retVal.push(partyLoggedIn);
//         }
//         console.log(retVal[1].wish);
//         // const computed = computeIfJoined(retVal);
//         // console.log(computed);
//         return res.status(200).json(retVal);
//       }

//       // eslint-disable-next-line
//       //   if (param == 0) {
//       //     // active = completed at is null
//       //     const getQuests = await prisma.quest.findMany({
//       //       where: {
//       //         userId: user.userId,
//       //         completedAt: null,
//       //       },
//       //     });
//       //     return res.status(200).json(getQuests);
//       //   }
//       //   // inactive = completedat is not null
//       //   const getQuests = await prisma.quest.findMany({
//       //     where: {
//       //       userId: user.userId,
//       //       visibility: "PUBLIC",
//       //       NOT: {
//       //         completedAt: null,
//       //       },
//       //     },
//       //   });
//       // return res.status(200).json({ message: "comin thru" });
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ message: "Something went wrong" });
//     }
//   } else {
//     return res.status(404).json({ message: "Method not allowed " });
//   }
// }
