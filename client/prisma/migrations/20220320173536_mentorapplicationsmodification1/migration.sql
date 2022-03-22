-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `file_fileId_fkey`;

-- AlterTable
ALTER TABLE `file` ALTER COLUMN `deletedAt` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `file` ADD CONSTRAINT `file_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
