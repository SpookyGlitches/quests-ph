/*
  Warnings:

  - You are about to alter the column `points` on the `QuestTasks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `QuestTasks` MODIFY `points` INTEGER NOT NULL;
