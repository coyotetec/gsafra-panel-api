-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('MANAGER', 'ADMIN', 'USER') NOT NULL;
