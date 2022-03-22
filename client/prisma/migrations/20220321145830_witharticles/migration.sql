-- CreateTable
CREATE TABLE `Article` (
    `articleId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `category` ENUM('SOCIAL', 'CAREER', 'HEALTH') NOT NULL DEFAULT 'SOCIAL',
    `link` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `status` ENUM('APPROVED', 'DISAPPROVED') NOT NULL DEFAULT 'DISAPPROVED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `approvedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`articleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
