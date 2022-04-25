-- CreateTable
CREATE TABLE `UserCurrency` (
    `userCurrencyId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `completedPublicQuests` INTEGER NOT NULL DEFAULT 0,
    `startedPublicQuests` INTEGER NOT NULL DEFAULT 0,
    `posts` INTEGER NOT NULL DEFAULT 0,
    `postReacts` INTEGER NOT NULL DEFAULT 0,
    `comments` INTEGER NOT NULL DEFAULT 0,
    `acceptedArticles` INTEGER NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `UserCurrency_userId_key`(`userId`),
    PRIMARY KEY (`userCurrencyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserCurrency` ADD CONSTRAINT `UserCurrency_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
