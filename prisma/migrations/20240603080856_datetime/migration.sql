/*
  Warnings:

  - The `LogoutDate` column on the `Logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Logs" DROP COLUMN "LogoutDate",
ADD COLUMN     "LogoutDate" TIMESTAMP(3);
