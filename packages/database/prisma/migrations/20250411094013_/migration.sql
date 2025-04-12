-- CreateEnum
CREATE TYPE "PaymentSlipStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE');

-- CreateEnum
CREATE TYPE "CondominiumLotStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "base_model" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "base_model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_slips" (
    "id" UUID NOT NULL,
    "payer_name" VARCHAR(255) NOT NULL,
    "amount_in_cents" INTEGER NOT NULL,
    "barcode" VARCHAR(255) NOT NULL,
    "status" "PaymentSlipStatus" NOT NULL,
    "condominium_lot_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "payment_slips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "condominium_lots" (
    "id" UUID NOT NULL,
    "external_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" "CondominiumLotStatus" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "condominium_lots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "base_model_id_key" ON "base_model"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_slips_id_key" ON "payment_slips"("id");

-- CreateIndex
CREATE UNIQUE INDEX "condominium_lots_id_key" ON "condominium_lots"("id");

-- CreateIndex
CREATE UNIQUE INDEX "condominium_lots_external_id_key" ON "condominium_lots"("external_id");

-- AddForeignKey
ALTER TABLE "payment_slips" ADD CONSTRAINT "payment_slips_condominium_lot_id_fkey" FOREIGN KEY ("condominium_lot_id") REFERENCES "condominium_lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
