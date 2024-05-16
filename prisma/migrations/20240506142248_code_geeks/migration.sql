-- CreateTable
CREATE TABLE "User" (
    "Uid" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" TEXT,
    "verificationTokenExpiry" TIMESTAMP(3),
    "forgotPassword" TEXT NOT NULL,
    "forgotPasswordExpiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Uid")
);

-- CreateTable
CREATE TABLE "Solved" (
    "pid" INTEGER NOT NULL,
    "pName" TEXT NOT NULL,
    "pLink" TEXT NOT NULL,
    "pDifficulty" TEXT NOT NULL,
    "isAttempted" BOOLEAN NOT NULL,
    "isSolved" BOOLEAN NOT NULL,
    "isFavourite" BOOLEAN NOT NULL,
    "code" TEXT NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "Solved_pkey" PRIMARY KEY ("pid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Solved" ADD CONSTRAINT "Solved_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("Uid") ON DELETE RESTRICT ON UPDATE CASCADE;
