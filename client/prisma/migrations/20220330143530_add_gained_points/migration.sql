/*
  Warnings:

  - Added the required column `gainedPoints` to the `PointsLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pointslog` ADD COLUMN `gainedPoints` INTEGER NOT NULL;
