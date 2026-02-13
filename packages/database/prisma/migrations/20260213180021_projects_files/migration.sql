/*
  Warnings:

  - You are about to drop the column `chatId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialPrompt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- DropIndex
DROP INDEX "Message_chatId_idx";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "chatId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "initialPrompt" TEXT NOT NULL,
ADD COLUMN     "sandboxId" TEXT,
ADD COLUMN     "sandboxUrl" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Chat";

-- CreateTable
CREATE TABLE "ProjectFile" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectFile" ADD CONSTRAINT "ProjectFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
