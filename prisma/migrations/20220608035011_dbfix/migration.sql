/*
  Warnings:

  - You are about to alter the column `status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.
  - Added the required column `ammount` to the `CashCut` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `CashCut` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cashcut` ADD COLUMN `ammount` DOUBLE NOT NULL,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `idCashCut` INTEGER NULL,
    MODIFY `status` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_idCashCut_fkey` FOREIGN KEY (`idCashCut`) REFERENCES `CashCut`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
