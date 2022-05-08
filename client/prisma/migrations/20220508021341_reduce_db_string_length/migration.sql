/*
  Warnings:

  - You are about to alter the column `outcome` on the `PartyMember` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(64)`.
  - You are about to alter the column `obstacle` on the `PartyMember` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(128)`.
  - You are about to alter the column `plan` on the `PartyMember` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(128)`.
  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `wish` on the `Quest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(64)`.
  - You are about to alter the column `mentorMessage` on the `Quest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `Comment` MODIFY `content` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `PartyMember` MODIFY `outcome` VARCHAR(64) NOT NULL,
    MODIFY `obstacle` VARCHAR(128) NOT NULL,
    MODIFY `plan` VARCHAR(128) NOT NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `title` VARCHAR(100) NOT NULL,
    MODIFY `body` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `Quest` MODIFY `wish` VARCHAR(64) NOT NULL,
    MODIFY `mentorMessage` VARCHAR(100) NULL;
