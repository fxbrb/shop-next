-- DropIndex
DROP INDEX "Address_userId_isDefault_key";

-- CreateIndex
CREATE INDEX "Address_userId_isDefault_idx" ON "Address"("userId", "isDefault");
