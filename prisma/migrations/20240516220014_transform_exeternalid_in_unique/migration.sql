/*
  Warnings:

  - A unique constraint covering the columns `[external_id]` on the table `company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `company_external_id_key` ON `company`(`external_id`);
