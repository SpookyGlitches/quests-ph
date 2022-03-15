-- DropForeignKey
ALTER TABLE `partymember` DROP FOREIGN KEY `PartyMember_questId_fkey`;

-- AddForeignKey
ALTER TABLE `PartyMember` ADD CONSTRAINT `PartyMember_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `Quest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
