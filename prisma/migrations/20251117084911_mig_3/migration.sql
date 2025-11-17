-- DropForeignKey
ALTER TABLE "Attachments" DROP CONSTRAINT "Attachments_messageId_fkey";

-- DropForeignKey
ALTER TABLE "ChatSessions" DROP CONSTRAINT "ChatSessions_modelId_fkey";

-- DropForeignKey
ALTER TABLE "ChatSessions" DROP CONSTRAINT "ChatSessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_preferredModelId_fkey";

-- AddForeignKey
ALTER TABLE "Attachments" ADD CONSTRAINT "Attachments_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatSessions" ADD CONSTRAINT "ChatSessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatSessions" ADD CONSTRAINT "ChatSessions_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "LLMModels"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_preferredModelId_fkey" FOREIGN KEY ("preferredModelId") REFERENCES "LLMModels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
