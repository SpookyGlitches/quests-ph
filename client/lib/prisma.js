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
    params.model == "QuestTask"
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
        params.args["data"] = { deletedAt: new Date() };
      }
    }
  }
  return next(params);
});
export default prisma;
