/*
  Warnings:

  - The primary key for the `mentorapplication` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `mentorapplication` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `mentorapplication` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `mentorfiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mentorId` to the `MentorApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mentorapplication` DROP FOREIGN KEY `mentorApplication_userId_fkey`;

-- DropForeignKey
ALTER TABLE `mentorfiles` DROP FOREIGN KEY `mentorFiles_uploadId_fkey`;

-- AlterTable
ALTER TABLE `mentorapplication` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `userId`,
    ADD COLUMN `mentorApplicationid` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `mentorId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`mentorApplicationid`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `userId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- DropTable
DROP TABLE `mentorfiles`;

-- CreateTable
CREATE TABLE `MentorFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mentorUploadId` INTEGER NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MentorApplication` ADD CONSTRAINT `MentorApplication_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MentorFile` ADD CONSTRAINT `MentorFile_mentorUploadId_fkey` FOREIGN KEY (`mentorUploadId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
