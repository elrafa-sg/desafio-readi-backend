-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENTE', 'OPERADOR', 'ADMINISTRADOR');

-- CreateEnum
CREATE TYPE "Certidao" AS ENUM ('CASAMENTO', 'NASCIMENTO', 'IMOVEL');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENTE',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitacao" (
    "id" SERIAL NOT NULL,
    "idSolicitante" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "dataNascimento" VARCHAR(11) NOT NULL,
    "logradouro" VARCHAR(255) NOT NULL,
    "numero" VARCHAR(6) NOT NULL,
    "cidade" VARCHAR(255) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "cep" CHAR(6) NOT NULL,
    "certidao" "Certidao" NOT NULL DEFAULT 'CASAMENTO',
    "urlDocumento" VARCHAR(255),

    CONSTRAINT "Solicitacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Solicitacao" ADD CONSTRAINT "Solicitacao_idSolicitante_fkey" FOREIGN KEY ("idSolicitante") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
