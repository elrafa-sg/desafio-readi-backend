/*
  Warnings:

  - You are about to drop the column `urlDocumento` on the `Solicitacao` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusSolicitacao" AS ENUM ('PENDENTE', 'EMITIDA', 'NEGADA');

-- AlterTable
ALTER TABLE "Solicitacao" DROP COLUMN "urlDocumento",
ADD COLUMN     "status" "StatusSolicitacao" NOT NULL DEFAULT 'PENDENTE',
ADD COLUMN     "urlCertidao" VARCHAR(255);
