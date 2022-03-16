/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtoken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dateOfBirth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `emailVerified`,
    DROP COLUMN `name`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dateOfBirth` DATETIME(3) NOT NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `displayName` VARCHAR(191) NOT NULL,
    ADD COLUMN `fullName` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    ADD COLUMN `verificationStatus` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `account`;

-- DropTable
DROP TABLE `session`;

-- DropTable
DROP TABLE `verificationtoken`;
