-- AlterTable
ALTER TABLE `promotions` MODIFY `expireAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `status` VARCHAR(191) NULL;
