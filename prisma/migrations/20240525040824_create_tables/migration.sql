-- CreateTable
CREATE TABLE "Usuario" (
    "UsuarioID" SERIAL NOT NULL,
    "Nome" VARCHAR(100) NOT NULL,
    "Email" VARCHAR(100) NOT NULL,
    "Senha" VARCHAR(100) NOT NULL,
    "PerfilID" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("UsuarioID")
);

-- CreateTable
CREATE TABLE "Perfil" (
    "PerfilID" SERIAL NOT NULL,
    "Nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("PerfilID")
);

-- CreateTable
CREATE TABLE "Modulo" (
    "ModuloID" SERIAL NOT NULL,
    "Nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "Modulo_pkey" PRIMARY KEY ("ModuloID")
);

-- CreateTable
CREATE TABLE "Transacao" (
    "TransacaoID" SERIAL NOT NULL,
    "Nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("TransacaoID")
);

-- CreateTable
CREATE TABLE "Funcao" (
    "FuncaoID" SERIAL NOT NULL,
    "Nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "Funcao_pkey" PRIMARY KEY ("FuncaoID")
);

-- CreateTable
CREATE TABLE "Perfil_Modulo" (
    "PerfilID" INTEGER NOT NULL,
    "ModuloID" INTEGER NOT NULL,

    CONSTRAINT "Perfil_Modulo_pkey" PRIMARY KEY ("PerfilID","ModuloID")
);

-- CreateTable
CREATE TABLE "Modulo_Transacao" (
    "ModuloID" INTEGER NOT NULL,
    "TransacaoID" INTEGER NOT NULL,

    CONSTRAINT "Modulo_Transacao_pkey" PRIMARY KEY ("ModuloID","TransacaoID")
);

-- CreateTable
CREATE TABLE "Transacao_Funcao" (
    "TransacaoID" INTEGER NOT NULL,
    "FuncaoID" INTEGER NOT NULL,

    CONSTRAINT "Transacao_Funcao_pkey" PRIMARY KEY ("TransacaoID","FuncaoID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_PerfilID_fkey" FOREIGN KEY ("PerfilID") REFERENCES "Perfil"("PerfilID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perfil_Modulo" ADD CONSTRAINT "Perfil_Modulo_PerfilID_fkey" FOREIGN KEY ("PerfilID") REFERENCES "Perfil"("PerfilID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perfil_Modulo" ADD CONSTRAINT "Perfil_Modulo_ModuloID_fkey" FOREIGN KEY ("ModuloID") REFERENCES "Modulo"("ModuloID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modulo_Transacao" ADD CONSTRAINT "Modulo_Transacao_ModuloID_fkey" FOREIGN KEY ("ModuloID") REFERENCES "Modulo"("ModuloID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modulo_Transacao" ADD CONSTRAINT "Modulo_Transacao_TransacaoID_fkey" FOREIGN KEY ("TransacaoID") REFERENCES "Transacao"("TransacaoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao_Funcao" ADD CONSTRAINT "Transacao_Funcao_TransacaoID_fkey" FOREIGN KEY ("TransacaoID") REFERENCES "Transacao"("TransacaoID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao_Funcao" ADD CONSTRAINT "Transacao_Funcao_FuncaoID_fkey" FOREIGN KEY ("FuncaoID") REFERENCES "Funcao"("FuncaoID") ON DELETE RESTRICT ON UPDATE CASCADE;
