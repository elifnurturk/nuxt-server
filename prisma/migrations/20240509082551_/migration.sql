/*
  Warnings:

  - You are about to drop the `Licence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Licence" DROP CONSTRAINT "Licence_ProductId_fkey";

-- DropForeignKey
ALTER TABLE "Licence" DROP CONSTRAINT "Licence_UserId_fkey";

-- DropForeignKey
ALTER TABLE "Logs" DROP CONSTRAINT "Logs_LicenceId_fkey";

-- DropTable
DROP TABLE "Licence";

-- CreateTable
CREATE TABLE "Licences" (
    "Id" SERIAL NOT NULL,
    "LicenceKey" TEXT NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3) NOT NULL,
    "UserId" INTEGER NOT NULL,
    "ProductId" INTEGER NOT NULL,

    CONSTRAINT "Licences_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Licences" ADD CONSTRAINT "Licences_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Licences" ADD CONSTRAINT "Licences_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Products"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_LicenceId_fkey" FOREIGN KEY ("LicenceId") REFERENCES "Licences"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
