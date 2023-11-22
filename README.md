# Desafio Readi - Backend

## Descrição:

Backend do projeto desenvolvido para o desafio de full stack da readi.

##### Tecnologias utilizadas:

- [Node](https://nodejs.org)
- [Express](https://expressjs.com)
- [Prisma](https://www.prisma.io)
- [PostgreSQL](https://www.postgresql.org)
- [JWT](https://jwt.io)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)


## Como usar:

1. Clone o repositório:
   ```
   git clone git@github.com:elrafa-sg/desafio-readi-backend.git
   ```
2. Dentro da pasta do projeto, instale as dependências\*:
   ```
   npm install
   ```
3. Crie o container do banco de dados:
   ```
   docker build -t drb-db -f Dockerfile-db .
   ```
4. Execute o container com o docker:
   ```
   docker run --name db -dp 5432:5432 -t drb-api
   ```
5. Execute projeto\*\* (versão para desenvolvimento):
   ```
   npm run dev
   ```
6. Crie uma build:
   ```
   npm run build
   ```
7. Execute o projeto\*\* (versão para produção):
   ```
   npm run start
   ```

#### \* Certifique-se de ter o [Node.js](https://nodejs.org/) e o [Docker](https://www.docker.com/) instalados.

#### \*\* Antes de executar o projeto, versão teste ou produção, certifique-se de preencher as variáveis de ambiente no arquivo .env.exemplo e renomeá-lo para .env
