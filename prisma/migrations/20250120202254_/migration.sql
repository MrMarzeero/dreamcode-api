/*
  Warnings:

  - You are about to drop the `cptestcases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cptestcases" DROP CONSTRAINT "cptestcases_questionId_fkey";

-- DropTable
DROP TABLE "cptestcases";
