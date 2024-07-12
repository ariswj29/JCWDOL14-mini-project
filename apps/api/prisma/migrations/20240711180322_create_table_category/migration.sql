/*
  Warnings:

  - You are about to drop the column `ticketType` on the `events` table. All the data in the column will be lost.
  - Added the required column `availableSeats` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFree` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `ticketType`,
    ADD COLUMN `availableSeats` INTEGER NOT NULL,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `isFree` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `profiles` ADD COLUMN `saldo` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumber` VARCHAR(15) NULL;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `icon` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `discount` DOUBLE NOT NULL,
    `isReferral` BOOLEAN NOT NULL,
    `eventId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotions` ADD CONSTRAINT `promotions_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
