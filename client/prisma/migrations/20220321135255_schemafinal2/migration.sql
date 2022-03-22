/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `mentorapplication` DROP FOREIGN KEY `MentorApplication_mentorId_fkey`;

-- DropForeignKey
ALTER TABLE `mentorfile` DROP FOREIGN KEY `MentorFile_mentorUploadId_fkey`;

-- AlterTable
ALTER TABLE `mentorapplication` MODIFY `mentorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `mentorfile` MODIFY `mentorUploadId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`);

-- AddForeignKey
ALTER TABLE `MentorApplication` ADD CONSTRAINT `MentorApplication_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MentorFile` ADD CONSTRAINT `MentorFile_mentorUploadId_fkey` FOREIGN KEY (`mentorUploadId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
