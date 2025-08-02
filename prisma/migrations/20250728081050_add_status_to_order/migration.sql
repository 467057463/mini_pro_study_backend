-- AlterTable
ALTER TABLE `order` ADD COLUMN `price` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `status` ENUM('normal', 'inProduction', 'dispatching', 'success') NOT NULL DEFAULT 'normal';

-- CreateTable
CREATE TABLE `Comment` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
