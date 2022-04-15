/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import { PrismaClient } from "@prisma/client";
// eslint-disable-next-line import/no-mutable-exports
let prisma;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
prisma.$use(async (params, next) => {
  // Check incoming query type
  if (
    params.model == "PartyMember" ||
    params.model == "Quest" ||
    params.model == "PostFile" ||
    params.model == "Post" ||
    params.model == "QuestTask" ||
    params.model == "QuestPartyBan" ||
    params.model == "PostReact" ||
    params.model == "Comment" ||
    params.model == "CommentReact"
  ) {
    if (params.action == "delete" || params.action == "deleteMany") {
      if (params.action == "delete") {
        params.action = "update";
      }
      if (params.action == "deleteMany") {
        params.args.where = { ...params.args.where, deletedAt: null };
        params.action = "updateMany";
      }

      if (params.args.data != undefined) {
        params.args.data["deletedAt"] = new Date();
      } else {
        params.args["data"] = { deletedAt: new Date() };
      }
    }
  }
  return next(params);
});

//
prisma.$use(async (params, next) => {
  if (
    params.model == "Quest" ||
    params.model == "PostFile" ||
    params.model == "PartyMember" ||
    params.model == "QuestPartyBan" ||
    params.model == "Post" ||
    params.model == "PostReact" ||
    params.model == "Comment" ||
    params.model == "CommentReact" ||
    params.model == "User"
  ) {
    if (params.action == "findMany" || params.action == "findFirst") {
      params.args["where"] = { ...params.args.where, deletedAt: null };
    }
  }
  return next(params);
});

// prisma.$on("query", (e) => console.log("Query:" + e.query));

export default prisma;
