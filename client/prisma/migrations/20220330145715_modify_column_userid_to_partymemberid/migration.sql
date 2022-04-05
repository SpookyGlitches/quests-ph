/*
  Warnings:

  - You are about to drop the column `userId` on the `pointslog` table. All the data in the column will be lost.
  - Added the required column `partyMemberId` to the `PointsLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pointslog` DROP FOREIGN KEY `PointsLog_userId_fkey`;

-- AlterTable
ALTER TABLE `pointslog` DROP COLUMN `userId`,
    ADD COLUMN `partyMemberId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PointsLog` ADD CONSTRAINT `PointsLog_partyMemberId_fkey` FOREIGN KEY (`partyMemberId`) REFERENCES `PartyMember`(`partyMemberId`) ON DELETE RESTRICT ON UPDATE CASCADE;
