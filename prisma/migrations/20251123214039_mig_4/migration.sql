/*
  Warnings:

  - You are about to drop the column `isThinking` on the `Messages` table. All the data in the column will be lost.
  - Made the column `content` on table `Messages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LLMModels" ADD COLUMN     "capabilities" JSONB;

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "isThinking",
ADD COLUMN     "modelId" TEXT,
ADD COLUMN     "reactiion" TEXT,
ADD COLUMN     "thinkingContent" TEXT,
ADD COLUMN     "thinkingDuration" INTEGER,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserSettings" ADD COLUMN     "contextLength" INTEGER;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "LLMModels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
