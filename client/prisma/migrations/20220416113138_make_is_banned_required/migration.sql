/*
  Warnings:

  - Made the column `isBanned` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `isBanned` BOOLEAN NOT NULL DEFAULT false;
