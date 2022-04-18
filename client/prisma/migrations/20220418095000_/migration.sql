-- DropForeignKey
ALTER TABLE `conversation` DROP FOREIGN KEY `Conversation_questId_fkey`;

-- AlterTable
ALTER TABLE `conversation` MODIFY `questId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `Quest`(`questId`) ON DELETE SET NULL ON UPDATE CASCADE;
