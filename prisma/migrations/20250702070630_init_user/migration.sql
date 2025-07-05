/*
  Warnings:

  - A unique constraint covering the columns `[openid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `openid` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_key` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `openid` VARCHAR(191) NOT NULL,
    ADD COLUMN `session_key` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_openid_key` ON `User`(`openid`);
