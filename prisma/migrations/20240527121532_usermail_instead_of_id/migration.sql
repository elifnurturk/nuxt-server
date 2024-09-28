/*
  Warnings:

  - You are about to drop the column `UserId` on the `Licences` table. All the data in the column will be lost.
  - Added the required column `UserMail` to the `Licences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Licences" DROP CONSTRAINT "Licences_UserId_fkey";

-- AlterTable
ALTER TABLE "Licences" DROP COLUMN "UserId",
ADD COLUMN     "UserMail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Licences" ADD CONSTRAINT "Licences_UserMail_fkey" FOREIGN KEY ("UserMail") REFERENCES "Users"("Email") ON DELETE RESTRICT ON UPDATE CASCADE;
