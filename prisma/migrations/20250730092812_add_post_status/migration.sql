-- AlterTable
ALTER TABLE `post` ADD COLUMN `status` ENUM('draft', 'official') NOT NULL DEFAULT 'draft';
