/*
  Warnings:

  - Added the required column `mentor` to the `QuestTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quest` to the `QuestTasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `QuestTasks` DROP FOREIGN KEY `QuestTasks_mentorId_fkey`;

-- DropForeignKey
ALTER TABLE `QuestTasks` DROP FOREIGN KEY `QuestTasks_questId_fkey`;

-- AlterTable
ALTER TABLE `QuestTasks` ADD COLUMN `mentor` INTEGER NOT NULL,
    ADD COLUMN `quest` INTEGER NOT NULL;
