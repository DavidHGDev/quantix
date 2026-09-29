/*
  Warnings:

  - You are about to alter the column `totalPagar` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - A unique constraint covering the columns `[codigoBarras]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subtotal` to the `DetallaVenta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoCredito" AS ENUM ('PENDIENTE', 'PAGADO', 'ANULADO');

-- AlterEnum
ALTER TYPE "MetodoPago" ADD VALUE 'CREDITO';

-- AlterTable
ALTER TABLE "DetallaVenta" ADD COLUMN     "subtotal" DECIMAL(12,2) NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "totalPagar" SET DATA TYPE DECIMAL(12,2);

-- CreateTable
CREATE TABLE "Credit" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "facturaId" INTEGER NOT NULL,
    "montoOriginal" DECIMAL(12,2) NOT NULL,
    "saldoCredito" DECIMAL(12,2) NOT NULL,
    "estado" "EstadoCredito" NOT NULL DEFAULT 'PENDIENTE',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "creditoId" INTEGER NOT NULL,
    "montoAbono" DECIMAL(12,2) NOT NULL,
    "metodoPago" "MetodoPago" NOT NULL,
    "nota" TEXT,
    "usuarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credit_facturaId_key" ON "Credit"("facturaId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_codigoBarras_key" ON "Product"("codigoBarras");

-- AddForeignKey
ALTER TABLE "DetallaVenta" ADD CONSTRAINT "DetallaVenta_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_creditoId_fkey" FOREIGN KEY ("creditoId") REFERENCES "Credit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
