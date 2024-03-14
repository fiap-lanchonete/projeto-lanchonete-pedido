/*
  Warnings:

  - A unique constraint covering the columns `[idempotent_key]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_idempotent_key_key" ON "Order"("idempotent_key");
