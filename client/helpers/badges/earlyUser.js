// returns a true or false
import { differenceInYears } from "date-fns";
import prisma from "../../lib/prisma";

export function isUserEarly(userCreatedAt) {
  // userCreatedAt should be of type Date
  const year = userCreatedAt.getFullYear();
  const month = userCreatedAt.getMonth();
  const date = userCreatedAt.getDate();

  // quests deployment date is april 18 2022
  const difference = differenceInYears(
    new Date(year, month, date),
    new Date(2022, 3, 18),
  );

  return difference === 0;
}

export function awardEarlyUser(userId) {
  return [
    prisma.userBadge.create({
      data: {
        userId,
        badgeId: 1,
      },
    }),
    prisma.notification.create({
      data: {
        userId,
        message: `Congratulations! You have received a badge for registering before ${"Quests'"} 1st anniversary.`,
        type: "RECEIVED_BADGE",
        metadata: JSON.stringify({ badgeId: 1 }),
      },
    }),
  ];
}
