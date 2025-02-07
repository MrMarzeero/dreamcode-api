/*
  Warnings:

  - Changed the type of `questionsAmount` on the `quizzes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "quizzes" DROP COLUMN "questionsAmount",
ADD COLUMN     "questionsAmount" INTEGER NOT NULL;
