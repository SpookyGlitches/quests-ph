-- AlterTable
ALTER TABLE `PartyMember` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Quest` MODIFY `wiki` LONGTEXT NOT NULL DEFAULT '';
