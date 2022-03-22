/*
  Warnings:

  - You are about to drop the `file` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `file_fileId_fkey`;

-- DropTable
DROP TABLE `file`;

-- CreateTable
CREATE TABLE `mentorFiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fileId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mentorFiles` ADD CONSTRAINT `mentorFiles_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
