/*
  Warnings:

  - A unique constraint covering the columns `[LicenceKey]` on the table `Logs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Logs_LicenceKey_key" ON "Logs"("LicenceKey");
