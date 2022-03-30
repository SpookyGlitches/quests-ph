/*
  Warnings:

  - Made the column `postId` on table `postfile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `postfile` DROP FOREIGN KEY `PostFile_postId_fkey`;

-- AlterTable
ALTER TABLE `postfile` MODIFY `postId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PostFile` ADD CONSTRAINT `PostFile_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`postId`) ON DELETE RESTRICT ON UPDATE CASCADE;
