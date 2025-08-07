/*
  Warnings:

  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `customerId` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `revenueId` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `invoice` table. All the data in the column will be lost.
  - The primary key for the `revenue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount` on the `revenue` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `customer_id` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revenue` to the `Revenue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `Invoice_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `Invoice_revenueId_fkey`;

-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `Invoice_userId_fkey`;

-- DropIndex
DROP INDEX `Invoice_customerId_fkey` ON `invoice`;

-- DropIndex
DROP INDEX `Invoice_revenueId_fkey` ON `invoice`;

-- DropIndex
DROP INDEX `Invoice_userId_fkey` ON `invoice`;

-- AlterTable
ALTER TABLE `customer` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `customerId`,
    DROP COLUMN `revenueId`,
    DROP COLUMN `userId`,
    ADD COLUMN `customer_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `revenue` DROP PRIMARY KEY,
    DROP COLUMN `amount`,
    ADD COLUMN `revenue` DOUBLE NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
