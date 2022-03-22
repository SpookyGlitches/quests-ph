/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`);

-- CreateTable
CREATE TABLE `MentorApplication` (
    `mentorApplicationid` INTEGER NOT NULL AUTO_INCREMENT,
    `mentorId` VARCHAR(191) NOT NULL,
    `experience` VARCHAR(191) NOT NULL,
    `detailedExperience` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`mentorApplicationid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MentorFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mentorUploadId` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MentorApplication` ADD CONSTRAINT `MentorApplication_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MentorFile` ADD CONSTRAINT `MentorFile_mentorUploadId_fkey` FOREIGN KEY (`mentorUploadId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
