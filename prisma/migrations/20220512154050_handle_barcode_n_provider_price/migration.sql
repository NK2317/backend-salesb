-- AlterTable
ALTER TABLE `product` ADD COLUMN `code` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `providerPrice` DOUBLE NOT NULL DEFAULT 0;
