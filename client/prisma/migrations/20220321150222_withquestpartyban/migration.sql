-- CreateTable
CREATE TABLE `QuestPartyBan` (
    `questPartyBanId` INTEGER NOT NULL AUTO_INCREMENT,
    `questId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`questPartyBanId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QuestPartyBan` ADD CONSTRAINT `QuestPartyBan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestPartyBan` ADD CONSTRAINT `QuestPartyBan_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `Quest`(`questId`) ON DELETE RESTRICT ON UPDATE CASCADE;
