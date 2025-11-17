/*
  Warnings:

  - You are about to drop the column `token` on the `password_resets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashed_token]` on the table `password_resets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashed_token` to the `password_resets` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "password_resets_token_key";

-- AlterTable
ALTER TABLE "password_resets" DROP COLUMN "token",
ADD COLUMN     "hashed_token" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "hashed_token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_hashed_token_key" ON "refresh_tokens"("hashed_token");

-- CreateIndex
CREATE UNIQUE INDEX "password_resets_hashed_token_key" ON "password_resets"("hashed_token");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
