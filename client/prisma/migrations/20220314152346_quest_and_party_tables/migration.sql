-- CreateTable
CREATE TABLE `Quest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wish` VARCHAR(191) NOT NULL,
    `difficulty` VARCHAR(191) NOT NULL,
    `visibility` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `wiki` VARCHAR(191) NOT NULL,
    `mentorMessage` VARCHAR(191) NULL,
    `estimatedStartDate` DATE NOT NULL,
    `estimatedEndDate` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `completedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PartyMember` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('MENTOR', 'MENTEE', 'PARTY_LEADER') NOT NULL DEFAULT 'MENTEE',
    `outcome` VARCHAR(191) NOT NULL,
    `obstacle` VARCHAR(191) NOT NULL,
    `plan` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `memberId` VARCHAR(191) NOT NULL,
    `questId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PartyMember` ADD CONSTRAINT `PartyMember_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PartyMember` ADD CONSTRAINT `PartyMember_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `Quest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
