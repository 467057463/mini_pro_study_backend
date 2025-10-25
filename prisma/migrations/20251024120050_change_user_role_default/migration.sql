-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('customer', 'admin', 'operator', 'courier') NOT NULL DEFAULT 'customer';
