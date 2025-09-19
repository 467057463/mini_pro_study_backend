/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Setting` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('normal', 'material', 'inProduction', 'dispatching', 'success') NOT NULL DEFAULT 'normal';

-- CreateIndex
CREATE UNIQUE INDEX `Setting_key_key` ON `Setting`(`key`);
