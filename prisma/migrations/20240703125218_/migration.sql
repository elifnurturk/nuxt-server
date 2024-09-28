/*
  Warnings:

  - A unique constraint covering the columns `[Username]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admin_Username_key" ON "Admin"("Username");
