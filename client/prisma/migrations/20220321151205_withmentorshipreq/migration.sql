-- CreateTable
CREATE TABLE `QuestMentorshipRequest` (
    `questMentorshipRequestId` INTEGER NOT NULL AUTO_INCREMENT,
    `partyLeaderId` VARCHAR(191) NOT NULL,
    `mentorId` VARCHAR(191) NOT NULL,
    `questId` INTEGER NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`questMentorshipRequestId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QuestMentorshipRequest` ADD CONSTRAINT `QuestMentorshipRequest_partyLeaderId_fkey` FOREIGN KEY (`partyLeaderId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestMentorshipRequest` ADD CONSTRAINT `QuestMentorshipRequest_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestMentorshipRequest` ADD CONSTRAINT `QuestMentorshipRequest_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `Quest`(`questId`) ON DELETE RESTRICT ON UPDATE CASCADE;
