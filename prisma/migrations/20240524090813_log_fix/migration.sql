/*
  Warnings:

  - You are about to drop the column `LicenceId` on the `Logs` table. All the data in the column will be lost.
  - You are about to drop the column `MAC` on the `Logs` table. All the data in the column will be lost.
  - Added the required column `LicenceKey` to the `Logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserMail` to the `Logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LogoutDate` to the `Logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Logs" DROP CONSTRAINT "Logs_LicenceId_fkey";

-- AlterTable
ALTER TABLE "Logs" DROP COLUMN "LicenceId",
DROP COLUMN "MAC",
ADD COLUMN     "LicenceKey" TEXT NOT NULL,
ADD COLUMN     "UserMail" TEXT NOT NULL,
ALTER COLUMN "LoginDate" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "LogoutDate",
ADD COLUMN     "LogoutDate" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_LicenceKey_fkey" FOREIGN KEY ("LicenceKey") REFERENCES "Licences"("LicenceKey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_UserMail_fkey" FOREIGN KEY ("UserMail") REFERENCES "Users"("Email") ON DELETE RESTRICT ON UPDATE CASCADE;
