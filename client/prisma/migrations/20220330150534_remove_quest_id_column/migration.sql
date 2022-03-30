/*
  Warnings:

  - You are about to drop the column `questId` on the `pointslog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `pointslog` DROP FOREIGN KEY `PointsLog_questId_fkey`;

-- AlterTable
ALTER TABLE `pointslog` DROP COLUMN `questId`;
