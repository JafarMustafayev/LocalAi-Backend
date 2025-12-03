/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "lastLoginDate" TIMESTAMP(3),
ADD COLUMN     "refreshToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_refreshToken_key" ON "Users"("refreshToken");

-- CreateIndex
CREATE INDEX "Users_email_idx" ON "Users"("email");
