/*
  Warnings:

  - Added the required column `transactionId` to the `attandees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attandees` ADD COLUMN `transactionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `attandees` ADD CONSTRAINT `attandees_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
