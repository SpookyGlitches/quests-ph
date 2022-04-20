-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `view_status` ENUM('SEEN', 'READ') NOT NULL DEFAULT 'SEEN';
