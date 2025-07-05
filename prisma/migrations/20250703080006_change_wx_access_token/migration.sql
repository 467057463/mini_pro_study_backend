/*
  Warnings:

  - You are about to drop the column `token` on the `wxtoken` table. All the data in the column will be lost.
  - Added the required column `access_token` to the `WxToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wxtoken` DROP COLUMN `token`,
    ADD COLUMN `access_token` VARCHAR(191) NOT NULL;
