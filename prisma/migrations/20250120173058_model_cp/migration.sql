-- AlterTable
ALTER TABLE "quizzes" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "cpquests" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "sample_input" TEXT NOT NULL,
    "sample_output" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "cpquests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cpquests" ADD CONSTRAINT "cpquests_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
