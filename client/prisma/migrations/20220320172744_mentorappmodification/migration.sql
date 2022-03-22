/*
  Warnings:

  - Added the required column `fullName` to the `file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` ADD COLUMN `fullName` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
