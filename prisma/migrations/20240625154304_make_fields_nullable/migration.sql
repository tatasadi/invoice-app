-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_clientAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_senderAddressId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "postCode" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "paymentDue" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "paymentTerms" DROP NOT NULL,
ALTER COLUMN "clientName" DROP NOT NULL,
ALTER COLUMN "clientEmail" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "senderAddressId" DROP NOT NULL,
ALTER COLUMN "clientAddressId" DROP NOT NULL,
ALTER COLUMN "total" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "invoiceDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "total" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_senderAddressId_fkey" FOREIGN KEY ("senderAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientAddressId_fkey" FOREIGN KEY ("clientAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
