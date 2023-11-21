import express from 'express'
import multer from 'multer'
import fs from 'fs'
import { SolicitacaoController } from '../controllers/SolicitacaoController'
import { authMiddleware } from '../middlewares/authMiddleware'

const app = express.Router()

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const path = `./uploads/`
            fs.mkdirSync(path, { recursive: true })
            return cb(null, path)
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
        }
    })
})

const solicitacao = new SolicitacaoController()

app.get('/', authMiddleware, solicitacao.get
    /*    
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/ListaSolicitacao' }
        }
        #swagger.responses[401] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
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
        #swagger.responses[401] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
    */
)

app.post('/', authMiddleware, upload.single('solicitacao'), solicitacao.create
    /*  
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/definitions/DadosSolicitacao' }
        }

        #swagger.responses[201] = {
            schema: { $ref: '#/definitions/Solicitacao' }
        }
        #swagger.responses[401] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
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
        #swagger.responses[401] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[403] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[404] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
    */
)

app.delete('/:id', authMiddleware, solicitacao.delete
    /*    
         #swagger.responses[200] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
         }
         #swagger.responses[401] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
         }
         #swagger.responses[403] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
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