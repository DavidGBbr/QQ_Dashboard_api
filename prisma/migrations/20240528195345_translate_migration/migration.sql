/*
  Warnings:

  - The primary key for the `Funcao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `FuncaoID` on the `Funcao` table. All the data in the column will be lost.
  - You are about to drop the column `Nome` on the `Funcao` table. All the data in the column will be lost.
  - The primary key for the `Modulo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ModuloID` on the `Modulo` table. All the data in the column will be lost.
  - You are about to drop the column `Nome` on the `Modulo` table. All the data in the column will be lost.
  - The primary key for the `Modulo_Transacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ModuloID` on the `Modulo_Transacao` table. All the data in the column will be lost.
  - You are about to drop the column `TransacaoID` on the `Modulo_Transacao` table. All the data in the column will be lost.
  - The primary key for the `Perfil` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Nome` on the `Perfil` table. All the data in the column will be lost.
  - You are about to drop the column `PerfilID` on the `Perfil` table. All the data in the column will be lost.
  - The primary key for the `Perfil_Modulo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ModuloID` on the `Perfil_Modulo` table. All the data in the column will be lost.
  - You are about to drop the column `PerfilID` on the `Perfil_Modulo` table. All the data in the column will be lost.
  - The primary key for the `Transacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Nome` on the `Transacao` table. All the data in the column will be lost.
  - You are about to drop the column `TransacaoID` on the `Transacao` table. All the data in the column will be lost.
  - The primary key for the `Transacao_Funcao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `FuncaoID` on the `Transacao_Funcao` table. All the data in the column will be lost.
  - You are about to drop the column `TransacaoID` on the `Transacao_Funcao` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Email` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `Nome` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `PerfilID` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `Senha` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `UsuarioID` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Funcao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Modulo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moduleId` to the `Modulo_Transacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Modulo_Transacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Perfil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moduleId` to the `Perfil_Modulo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Perfil_Modulo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Transacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `functionId` to the `Transacao_Funcao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Transacao_Funcao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Modulo_Transacao" DROP CONSTRAINT "Modulo_Transacao_ModuloID_fkey";

-- DropForeignKey
ALTER TABLE "Modulo_Transacao" DROP CONSTRAINT "Modulo_Transacao_TransacaoID_fkey";

-- DropForeignKey
ALTER TABLE "Perfil_Modulo" DROP CONSTRAINT "Perfil_Modulo_ModuloID_fkey";

-- DropForeignKey
ALTER TABLE "Perfil_Modulo" DROP CONSTRAINT "Perfil_Modulo_PerfilID_fkey";

-- DropForeignKey
ALTER TABLE "Transacao_Funcao" DROP CONSTRAINT "Transacao_Funcao_FuncaoID_fkey";

-- DropForeignKey
ALTER TABLE "Transacao_Funcao" DROP CONSTRAINT "Transacao_Funcao_TransacaoID_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_PerfilID_fkey";

-- DropIndex
DROP INDEX "Usuario_Email_key";

-- AlterTable
ALTER TABLE "Funcao" DROP CONSTRAINT "Funcao_pkey",
DROP COLUMN "FuncaoID",
DROP COLUMN "Nome",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "functionId" SERIAL NOT NULL,
ADD COLUMN     "name" VARCHAR(100) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Funcao_pkey" PRIMARY KEY ("functionId");

-- AlterTable
ALTER TABLE "Modulo" DROP CONSTRAINT "Modulo_pkey",
DROP COLUMN "ModuloID",
DROP COLUMN "Nome",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "moduleId" SERIAL NOT NULL,
ADD COLUMN     "name" VARCHAR(100) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Modulo_pkey" PRIMARY KEY ("moduleId");

-- AlterTable
ALTER TABLE "Modulo_Transacao" DROP CONSTRAINT "Modulo_Transacao_pkey",
DROP COLUMN "ModuloID",
DROP COLUMN "TransacaoID",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "moduleId" INTEGER NOT NULL,
ADD COLUMN     "transactionId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Modulo_Transacao_pkey" PRIMARY KEY ("moduleId", "transactionId");

-- AlterTable
ALTER TABLE "Perfil" DROP CONSTRAINT "Perfil_pkey",
DROP COLUMN "Nome",
DROP COLUMN "PerfilID",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" VARCHAR(100) NOT NULL,
ADD COLUMN     "profileId" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Perfil_pkey" PRIMARY KEY ("profileId");

-- AlterTable
ALTER TABLE "Perfil_Modulo" DROP CONSTRAINT "Perfil_Modulo_pkey",
DROP COLUMN "ModuloID",
DROP COLUMN "PerfilID",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "moduleId" INTEGER NOT NULL,
ADD COLUMN     "profileId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Perfil_Modulo_pkey" PRIMARY KEY ("profileId", "moduleId");

-- AlterTable
ALTER TABLE "Transacao" DROP CONSTRAINT "Transacao_pkey",
DROP COLUMN "Nome",
DROP COLUMN "TransacaoID",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" VARCHAR(100) NOT NULL,
ADD COLUMN     "transactionId" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Transacao_pkey" PRIMARY KEY ("transactionId");

-- AlterTable
ALTER TABLE "Transacao_Funcao" DROP CONSTRAINT "Transacao_Funcao_pkey",
DROP COLUMN "FuncaoID",
DROP COLUMN "TransacaoID",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "functionId" INTEGER NOT NULL,
ADD COLUMN     "transactionId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Transacao_Funcao_pkey" PRIMARY KEY ("transactionId", "functionId");

-- AlterTable
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pkey",
DROP COLUMN "Email",
DROP COLUMN "Nome",
DROP COLUMN "PerfilID",
DROP COLUMN "Senha",
DROP COLUMN "UsuarioID",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" VARCHAR(100) NOT NULL,
ADD COLUMN     "name" VARCHAR(100) NOT NULL,
ADD COLUMN     "password" VARCHAR(100) NOT NULL,
ADD COLUMN     "profileId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Perfil"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perfil_Modulo" ADD CONSTRAINT "Perfil_Modulo_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Perfil"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perfil_Modulo" ADD CONSTRAINT "Perfil_Modulo_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Modulo"("moduleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modulo_Transacao" ADD CONSTRAINT "Modulo_Transacao_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Modulo"("moduleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modulo_Transacao" ADD CONSTRAINT "Modulo_Transacao_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transacao"("transactionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao_Funcao" ADD CONSTRAINT "Transacao_Funcao_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transacao"("transactionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao_Funcao" ADD CONSTRAINT "Transacao_Funcao_functionId_fkey" FOREIGN KEY ("functionId") REFERENCES "Funcao"("functionId") ON DELETE RESTRICT ON UPDATE CASCADE;
