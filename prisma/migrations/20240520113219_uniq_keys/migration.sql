/*
  Warnings:

  - A unique constraint covering the columns `[LicenceKey]` on the table `Licences` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Licences_LicenceKey_key" ON "Licences"("LicenceKey");
