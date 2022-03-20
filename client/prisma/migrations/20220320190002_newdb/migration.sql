/*
  Warnings:

  - You are about to drop the column `fileId` on the `mentorfiles` table. All the data in the column will be lost.
  - Added the required column `uploadId` to the `mentorFiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mentorfiles` DROP FOREIGN KEY `mentorFiles_fileId_fkey`;

-- AlterTable
ALTER TABLE `mentorfiles` DROP COLUMN `fileId`,
    ADD COLUMN `uploadId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `mentorFiles` ADD CONSTRAINT `mentorFiles_uploadId_fkey` FOREIGN KEY (`uploadId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
