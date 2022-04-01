/*
  Warnings:

  - You are about to drop the column `path` on the `postfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileName]` on the table `PostFile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileName` to the `PostFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `PostFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `postfile` DROP COLUMN `path`,
    ADD COLUMN `fileName` VARCHAR(191) NOT NULL,
    ADD COLUMN `mimeType` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PostFile_fileName_key` ON `PostFile`(`fileName`);
