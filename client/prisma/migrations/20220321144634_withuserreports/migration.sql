/*
  Warnings:

  - The primary key for the `mentorfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `mentorfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `mentorfile` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `mentorFileId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`mentorFileId`);

-- CreateTable
CREATE TABLE `UserReport` (
    `userReportId` INTEGER NOT NULL AUTO_INCREMENT,
    `reporterId` VARCHAR(191) NOT NULL,
    `recipientId` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `banStart` DATETIME(3) NULL,
    `banEnd` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`userReportId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserReport` ADD CONSTRAINT `UserReport_reporterId_fkey` FOREIGN KEY (`reporterId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReport` ADD CONSTRAINT `UserReport_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
