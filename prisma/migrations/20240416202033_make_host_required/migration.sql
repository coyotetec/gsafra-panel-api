/*
  Warnings:

  - Made the column `host` on table `company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `company` MODIFY `host` VARCHAR(191) NOT NULL;
