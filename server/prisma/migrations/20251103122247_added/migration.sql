-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'medium', 'hard');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'completed');

-- CreateTable
CREATE TABLE "SessionSchema" (
    "id" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "hostId" TEXT NOT NULL,
    "participantId" TEXT,
    "status" "Status" NOT NULL DEFAULT 'active',
    "callId" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionSchema_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionSchema" ADD CONSTRAINT "SessionSchema_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionSchema" ADD CONSTRAINT "SessionSchema_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
