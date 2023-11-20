import express from 'express'
import { UsuarioController } from '../controllers/UsuarioController'

const app = express.Router()

const usuario = new UsuarioController()

app.post('/login', usuario.login
 /* 
    #swagger.parameters['obj'] = {
        in: 'body',
        schema: { $ref: '#/definitions/DadosLogin' }
    }

    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/RespostaLogin' }
    }
    #swagger.responses[404] = {
        schema: { $ref: '#/definitions/RespostaPadrao' }
    }
    #swagger.responses[500] = {
        schema: { $ref: '#/definitions/RespostaPadrao' }
    }
*/
)

export default app