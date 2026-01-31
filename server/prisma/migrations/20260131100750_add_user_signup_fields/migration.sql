-- AlterTable
ALTER TABLE "user" ADD COLUMN     "country" TEXT,
ADD COLUMN     "currency" TEXT DEFAULT '$',
ADD COLUMN     "language" TEXT DEFAULT 'en',
ADD COLUMN     "role" TEXT,
ADD COLUMN     "termsAccepted" BOOLEAN DEFAULT false;
