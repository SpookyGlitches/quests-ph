const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// no need to use our own prisma lib thingy since this is outside
// idk why i didnt use loop here :(
async function main() {
  await prisma.badge.upsert({
    where: { badgeId: 1 },
    update: {},
    create: {
      name: "Early User",
      description: "Registered before the 1st anniversary of Quests",
      image: "earlyUser.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 2 },
    update: {},
    create: {
      name: "Young One",
      description: "Completed a Public Quest",
      image: "youngOne.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 3 },
    update: {},
    create: {
      name: "Achiever",
      description: "Completed 10 Public Quests",
      image: "achiever.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 4 },
    update: {},
    create: {
      name: "Man of Action",
      description: "Completed 50 Public Quests",
      image: "manOfAction.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 5 },
    update: {},
    create: {
      name: "Little Shot",
      description: "Started a Public Quest",
      image: "littleShot.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 6 },
    update: {},
    create: {
      name: "Fine Mover",
      description: "Started 10 Public Quests",
      image: "fineMover.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 7 },
    update: {},
    create: {
      name: "Initiator",
      description: "Started 50 Public Quests",
      image: "initiator.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 8 },
    update: {},
    create: {
      name: "Publisher",
      description: "Created a Post",
      image: "publisher.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 9 },
    update: {},
    create: {
      name: "Expressive",
      description: "Reacted to 10 Posts",
      image: "expressive.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 10 },
    update: {},
    create: {
      name: "Supportive Comrade",
      description: "Reacted to 50 posts",
      image: "supportiveComrade.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 11 },
    update: {},
    create: {
      name: "Insightful",
      description: "Commented on 10 Posts",
      image: "insightful.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 12 },
    update: {},
    create: {
      name: "Sage",
      description: "Commented on 50 Posts",
      image: "sage.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 13 },
    update: {},
    create: {
      name: "Paver",
      description: "Successfully mentored 10 Public Quests",
      image: "paver.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 14 },
    update: {},
    create: {
      name: "Pathfinder",
      description: "Successfully mentored 50 Public Quests",
      image: "pathfinder.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 15 },
    update: {},
    create: {
      name: "Contributor",
      description: "Successfully submitted 10 articles",
      image: "contributor.svg",
    },
  });
  await prisma.badge.upsert({
    where: { badgeId: 16 },
    update: {},
    create: {
      name: "Educator",
      description: "Successfully submitted 50 articles",
      image: "educator.svg",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
