-- CreateTable
CREATE TABLE "PortfolioMetric" (
    "id" SERIAL NOT NULL,
    "eventName" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "sessionId" TEXT,
    "value" DOUBLE PRECISION,
    "durationMs" INTEGER,
    "success" BOOLEAN,
    "meta" JSONB,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT "PortfolioMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PortfolioMetric_eventName_idx" ON "PortfolioMetric"("eventName");

-- CreateIndex
CREATE INDEX "PortfolioMetric_createdAt_idx" ON "PortfolioMetric"("createdAt");
