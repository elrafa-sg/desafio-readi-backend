import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Readi API',
    description: 'Api para o desafio da readi',
  },
  host: 'localhost:3000',
  tags: ['Usuario', 'Solicitacao'],
  definitions: {
    DadosLogin: {
      email: '',
      senha: '',
    },
    RespostaLogin: {
      access_token: '',
      email: '',
    },
    Solicitacao: {
      id: '',
      idSolicitante: '',
      nome: '',
      cpf: '',
      telefone: '',
      dataNascimento: '',
      logradouro: '',
      numero: '',
      cidade: '',
      uf: '',
      cep: '',
      urlCertidao: '',
      status: '',
    },
    ListaSolicitacao: [{ $ref: '#/definitions/Solicitacao' }],
    RespostaPadrao: {
      message: '',
    },
  },
};

const outputFile = './swagger.json';
const routes = ['./src/routers/index.ts'];

swaggerAutogen()(outputFile, routes, doc);