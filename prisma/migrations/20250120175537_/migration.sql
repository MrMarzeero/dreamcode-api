-- CreateTable
CREATE TABLE "cpsolutions" (
    "id" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "cpsolutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cptestcases" (
    "id" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "cptestcases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cpsolutions_questionId_key" ON "cpsolutions"("questionId");

-- AddForeignKey
ALTER TABLE "cpsolutions" ADD CONSTRAINT "cpsolutions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "cpquests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cptestcases" ADD CONSTRAINT "cptestcases_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "cpquests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
