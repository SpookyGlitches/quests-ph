import { differenceInYears } from "date-fns";

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
  return difference <= 0;
}

export function awardEarlyUser() {
  return {
    userBadges: {
      create: {
        badgeId: 1,
      },
    },
    notifications: {
      create: {
        message: `Congratulations! You have received a badge for registering before ${"Quests'"} 1st anniversary.`,
        type: "RECEIVED_BADGE",
        metadata: JSON.stringify({ badgeId: 1 }),
      },
    },
  };
}
