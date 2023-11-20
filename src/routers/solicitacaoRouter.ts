import express from 'express'
import { SolicitacaoController } from '../controllers/SolicitacaoController'

const app = express.Router()

const solicitacao = new SolicitacaoController()

app.get('/', solicitacao.get)
app.get('/:id', solicitacao.getById)
app.post('/', solicitacao.create)
app.patch('/:id', solicitacao.update)
app.delete('/:id', solicitacao.delete)

export default app