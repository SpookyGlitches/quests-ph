/*
  Warnings:

  - You are about to drop the column `fullName` on the `file` table. All the data in the column will be lost.
  - Added the required column `name` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` DROP COLUMN `fullName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
