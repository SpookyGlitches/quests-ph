/*
  Warnings:

  - You are about to alter the column `difficulty` on the `quest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Quest_difficulty")`.
  - You are about to alter the column `visibility` on the `quest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Quest_visibility")`.
  - You are about to alter the column `category` on the `quest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Quest_category")`.

*/
-- AlterTable
ALTER TABLE `quest` MODIFY `difficulty` ENUM('EASY', 'MEDIUM', 'HARD') NOT NULL DEFAULT 'EASY',
    MODIFY `visibility` ENUM('PUBLIC', 'PRIVATE') NOT NULL DEFAULT 'PRIVATE',
    MODIFY `category` ENUM('SOCIAL', 'CAREER', 'HEALTH') NOT NULL DEFAULT 'SOCIAL',
    MODIFY `wiki` VARCHAR(191) NULL;
