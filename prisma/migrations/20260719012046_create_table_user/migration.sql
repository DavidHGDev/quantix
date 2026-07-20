-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('CC', 'NIT', 'PP');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firsName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "tipoDocumento" "TipoDocumento" NOT NULL,
    "documento" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
