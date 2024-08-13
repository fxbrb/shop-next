/*
  Warnings:

  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "address",
ADD COLUMN     "address_line1" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "address_line2" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "country" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "postalCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "state" TEXT NOT NULL DEFAULT '';
