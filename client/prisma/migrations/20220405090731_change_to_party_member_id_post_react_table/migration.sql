/*
  Warnings:

  - You are about to drop the column `userId` on the `postreact` table. All the data in the column will be lost.
  - Added the required column `partyMemberId` to the `PostReact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `postreact` DROP FOREIGN KEY `PostReact_userId_fkey`;

-- AlterTable
ALTER TABLE `postreact` DROP COLUMN `userId`,
    ADD COLUMN `partyMemberId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PostReact` ADD CONSTRAINT `PostReact_partyMemberId_fkey` FOREIGN KEY (`partyMemberId`) REFERENCES `PartyMember`(`partyMemberId`) ON DELETE RESTRICT ON UPDATE CASCADE;
