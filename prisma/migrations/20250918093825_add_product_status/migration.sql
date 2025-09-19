-- AlterTable
ALTER TABLE `product` ADD COLUMN `status` ENUM('normal', 'soldOut') NOT NULL DEFAULT 'normal';
