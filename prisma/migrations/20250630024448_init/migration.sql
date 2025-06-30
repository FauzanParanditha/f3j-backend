-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "flightTime" TEXT NOT NULL,
    "flightSeconds" INTEGER NOT NULL,
    "landingScore" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "relaunchCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);
