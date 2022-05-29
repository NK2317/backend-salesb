/*
  Warnings:

  - You are about to drop the column `OrderID` on the `productonorder` table. All the data in the column will be lost.
  - You are about to drop the column `Qty` on the `productonorder` table. All the data in the column will be lost.
  - Added the required column `orderID` to the `ProductOnOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `ProductOnOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `productonorder` DROP FOREIGN KEY `ProductOnOrder_OrderID_fkey`;

-- AlterTable
ALTER TABLE `productonorder` DROP COLUMN `OrderID`,
    DROP COLUMN `Qty`,
    ADD COLUMN `orderID` INTEGER NOT NULL,
    ADD COLUMN `qty` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `ProductOnOrder` ADD CONSTRAINT `ProductOnOrder_orderID_fkey` FOREIGN KEY (`orderID`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
