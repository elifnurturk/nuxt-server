/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Users" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Surname" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Products" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Details" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Licence" (
    "Id" SERIAL NOT NULL,
    "LicenceKey" TEXT NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3) NOT NULL,
    "UserId" INTEGER NOT NULL,
    "ProductId" INTEGER NOT NULL,

    CONSTRAINT "Licence_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "Id" SERIAL NOT NULL,
    "LicenceId" INTEGER NOT NULL,
    "MAC" TEXT NOT NULL,
    "IP" TEXT NOT NULL,
    "LoginDate" TIMESTAMP(3) NOT NULL,
    "LogoutDate" TIMESTAMP(3),

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "Id" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");

-- AddForeignKey
ALTER TABLE "Licence" ADD CONSTRAINT "Licence_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Licence" ADD CONSTRAINT "Licence_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Products"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_LicenceId_fkey" FOREIGN KEY ("LicenceId") REFERENCES "Licence"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
