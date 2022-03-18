/*
  Warnings:

  - Made the column `dateOfBirth` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `displayName` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `dateOfBirth` DATETIME(3) NOT NULL,
    MODIFY `displayName` VARCHAR(191) NOT NULL,
    MODIFY `isActive` CHAR(1) NOT NULL DEFAULT '1',
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `role` VARCHAR(191) NOT NULL;
