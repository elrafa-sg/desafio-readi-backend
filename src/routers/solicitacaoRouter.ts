import express from 'express'
import { SolicitacaoController } from '../controllers/SolicitacaoController'

import { authMiddleware } from '../middlewares/authMiddleware'

const app = express.Router()

const solicitacao = new SolicitacaoController()

app.get('/', authMiddleware, solicitacao.get
    /*    
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/ListaSolicitacao' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
    */
)

app.get('/:id', authMiddleware, solicitacao.getById
    /*    
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Solicitacao' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
    */
)

app.post('/', authMiddleware, solicitacao.create
    /*    
        #swagger.responses[201] = {
            schema: { $ref: '#/definitions/Solicitacao' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
    */
)

app.patch('/:id', authMiddleware, solicitacao.update
    /*    
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Solicitacao' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
    */
)

app.delete('/:id', authMiddleware, solicitacao.delete
    /*    
         #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Solicitacao' }
         }
         #swagger.responses[500] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
         }
    */
)

export default app