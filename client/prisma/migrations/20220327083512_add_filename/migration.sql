/*
  Warnings:

  - You are about to drop the column `fileName` on the `postfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `PostFile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `PostFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `PostFile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `PostFile_fileName_key` ON `postfile`;

-- AlterTable
ALTER TABLE `postfile` DROP COLUMN `fileName`,
    ADD COLUMN `key` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PostFile_key_key` ON `PostFile`(`key`);
