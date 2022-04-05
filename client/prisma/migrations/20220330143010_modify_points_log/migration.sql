/*
  Warnings:

  - You are about to drop the `pointlog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pointlog` DROP FOREIGN KEY `PointLog_userId_fkey`;

-- DropTable
DROP TABLE `pointlog`;

-- CreateTable
CREATE TABLE `PointsLog` (
    `pointsLogId` INTEGER NOT NULL AUTO_INCREMENT,
    `questId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `action` ENUM('COMPLETED_TASK', 'RECEIVED_POST_REACT', 'RECEIVED_COMMENT_REACT', 'RECEIVED_POST_COMMENT') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`pointsLogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PointsLog` ADD CONSTRAINT `PointsLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PointsLog` ADD CONSTRAINT `PointsLog_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `Quest`(`questId`) ON DELETE RESTRICT ON UPDATE CASCADE;
