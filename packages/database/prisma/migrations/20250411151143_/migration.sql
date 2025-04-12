/*
  Warnings:

  - You are about to drop the column `external_id` on the `condominium_lots` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `condominium_lots` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "condominium_lots_external_id_key";

-- AlterTable
ALTER TABLE "condominium_lots" DROP COLUMN "external_id";

-- CreateIndex
CREATE UNIQUE INDEX "condominium_lots_name_key" ON "condominium_lots"("name");
