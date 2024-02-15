/*
  Warnings:

  - Made the column `external_id` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `external_id` INTEGER NOT NULL;
