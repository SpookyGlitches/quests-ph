/*
  Warnings:

  - You are about to drop the column `name` on the `mentorfiles` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `mentorfiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `mentorfiles` DROP COLUMN `name`,
    DROP COLUMN `type`;
