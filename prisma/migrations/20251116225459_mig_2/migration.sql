/*
  Warnings:

  - You are about to drop the column `isActive` on the `ChatSessions` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatSessions" DROP COLUMN "isActive",
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "deletedAt",
DROP COLUMN "isDeleted";
