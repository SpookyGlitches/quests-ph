/*
  Warnings:

  - You are about to drop the column `mentor` on the `QuestTasks` table. All the data in the column will be lost.
  - You are about to drop the column `quest` on the `QuestTasks` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `QuestTasks_mentorId_fkey` ON `QuestTasks`;

-- DropIndex
DROP INDEX `QuestTasks_questId_fkey` ON `QuestTasks`;

-- AlterTable
ALTER TABLE `QuestTasks` DROP COLUMN `mentor`,
    DROP COLUMN `quest`;
