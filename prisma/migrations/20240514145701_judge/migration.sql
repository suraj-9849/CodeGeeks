/*
  Warnings:

  - Made the column `verificationToken` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "verificationToken" SET NOT NULL,
ALTER COLUMN "verificationToken" SET DEFAULT '',
ALTER COLUMN "verificationTokenExpiry" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "forgotPassword" SET DEFAULT '',
ALTER COLUMN "forgotPasswordExpiry" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Problem" (
    "pid" INTEGER NOT NULL,
    "pName" TEXT NOT NULL,
    "pDesc" TEXT NOT NULL,
    "pDifficulty" TEXT NOT NULL,
    "constraints" TEXT[],

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "examples" (
    "id" SERIAL NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "pid" INTEGER NOT NULL,

    CONSTRAINT "examples_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "examples" ADD CONSTRAINT "examples_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Problem"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;
