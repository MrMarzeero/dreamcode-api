-- DropForeignKey
ALTER TABLE "cpquests" DROP CONSTRAINT "cpquests_authorId_fkey";

-- DropForeignKey
ALTER TABLE "cpsolutions" DROP CONSTRAINT "cpsolutions_questionId_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_quizId_fkey";

-- DropForeignKey
ALTER TABLE "quizzes" DROP CONSTRAINT "quizzes_authorId_fkey";

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpquests" ADD CONSTRAINT "cpquests_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cpsolutions" ADD CONSTRAINT "cpsolutions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "cpquests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
