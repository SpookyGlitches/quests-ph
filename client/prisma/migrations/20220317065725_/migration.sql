-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `Account` ADD COLUMN `mentorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Session` ADD COLUMN `mentorId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Mentor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `Mentor_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wish` VARCHAR(191) NOT NULL,
    `difficulty` VARCHAR(191) NOT NULL,
    `visibility` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `wiki` VARCHAR(191) NOT NULL DEFAULT '[{"type":"p","children":[{"text":""}]}]',
    `mentorMessage` VARCHAR(191) NULL,
    `estimatedStartDate` DATE NOT NULL,
    `estimatedEndDate` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `completedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestTasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questId` INTEGER NOT NULL,
    `mentorId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `points` VARCHAR(191) NOT NULL,
    `dueAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `Mentor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `Mentor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestTasks` ADD CONSTRAINT `QuestTasks_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `Mentor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestTasks` ADD CONSTRAINT `QuestTasks_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `Quest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
