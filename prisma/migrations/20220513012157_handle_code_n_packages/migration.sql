-- CreateTable
CREATE TABLE `Packages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductOnPackage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productID` INTEGER NOT NULL,
    `PackageID` INTEGER NOT NULL,
    `ProductQty` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
