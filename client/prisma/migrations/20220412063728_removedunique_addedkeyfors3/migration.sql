-- DropIndex
DROP INDEX `User_displayName_key` ON `user`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `mentorfile` ADD COLUMN `key` VARCHAR(191) NULL;
