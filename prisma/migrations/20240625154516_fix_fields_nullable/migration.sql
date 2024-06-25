/*
  Warnings:

  - Made the column `status` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `senderAddressId` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clientAddressId` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `invoiceDate` on table `Invoice` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_clientAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_senderAddressId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "senderAddressId" SET NOT NULL,
ALTER COLUMN "clientAddressId" SET NOT NULL,
ALTER COLUMN "total" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "invoiceDate" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_senderAddressId_fkey" FOREIGN KEY ("senderAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientAddressId_fkey" FOREIGN KEY ("clientAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
