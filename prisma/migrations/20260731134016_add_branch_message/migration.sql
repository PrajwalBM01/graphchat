-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'system';

-- AlterTable
ALTER TABLE "Edge" ADD COLUMN     "branchMessage" TEXT;
