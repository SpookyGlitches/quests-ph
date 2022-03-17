/*
  Warnings:

  - A unique constraint covering the columns `[questId,memberId]` on the table `PartyMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PartyMember_questId_memberId_key` ON `PartyMember`(`questId`, `memberId`);
