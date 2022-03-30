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
    params.model == "QuestPartyBan"
  ) {
    if (params.action == "delete") {
      // Delete queries
      // Change action to an update
      params.action = "update";
      params.args["data"] = { deletedAt: new Date() };
    }
    if (params.action == "deleteMany") {
      // Delete many queries
      params.action = "updateMany";
      if (params.args.data != undefined) {
        params.args.data["deletedAt"] = new Date();
      } else {
        if (params.args["where"]) {
          params.args["where"] = { ...params.args["where"], deletedAt: null };
        } else {
          params.args["where"] = { deletedAt: null };
        }
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
    params.model == "Quest" ||
    params.model == "PartyMember" ||
    params.model == "QuestPartyBan"
  ) {
    if (params.action == "findMany" || params.action == "findFirst") {
      params.args["where"] = { ...params.args["where"], deletedAt: null };
    }
  }
  return next(params);
});

// prisma.$on("query", (e) => console.log("Query:" + e.query));

export default prisma;
