
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Readi API',
    description: 'Api para o desafio da readi'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger.json';
const routes = ['./src/routers/index.ts'];

swaggerAutogen()(outputFile, routes, doc);