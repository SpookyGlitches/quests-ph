-- DropForeignKey
ALTER TABLE `postfile` DROP FOREIGN KEY `PostFile_postId_fkey`;

-- AlterTable
ALTER TABLE `postfile` MODIFY `postId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `PostFile` ADD CONSTRAINT `PostFile_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`postId`) ON DELETE SET NULL ON UPDATE CASCADE;
