/*
  Warnings:

  - You are about to drop the column `userId` on the `postfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `postfile` DROP FOREIGN KEY `PostFile_userId_fkey`;

-- AlterTable
ALTER TABLE `postfile` DROP COLUMN `userId`;
