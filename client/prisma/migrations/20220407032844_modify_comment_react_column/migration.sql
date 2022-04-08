/*
  Warnings:

  - You are about to drop the column `postId` on the `commentreact` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `commentreact` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `CommentReact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partyMemberId` to the `CommentReact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `commentreact` DROP FOREIGN KEY `CommentReact_userId_fkey`;

-- AlterTable
ALTER TABLE `commentreact` DROP COLUMN `postId`,
    DROP COLUMN `userId`,
    ADD COLUMN `commentId` INTEGER NOT NULL,
    ADD COLUMN `partyMemberId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CommentReact` ADD CONSTRAINT `CommentReact_partyMemberId_fkey` FOREIGN KEY (`partyMemberId`) REFERENCES `PartyMember`(`partyMemberId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentReact` ADD CONSTRAINT `CommentReact_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`commentId`) ON DELETE RESTRICT ON UPDATE CASCADE;
