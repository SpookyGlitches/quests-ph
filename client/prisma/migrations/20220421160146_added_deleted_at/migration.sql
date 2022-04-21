-- AlterTable
ALTER TABLE `PointsLog` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `QuestTaskFinisher` ADD COLUMN `deletedAt` DATETIME(3) NULL;
