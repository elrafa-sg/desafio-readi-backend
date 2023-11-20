import express from 'express'

import usuarioRoutes from './usuarioRouter'
import solicitacaoRoutes from './solicitacaoRouter'

const router = express.Router()

router.use('/usuario', usuarioRoutes)
router.use('/solicitacao', solicitacaoRoutes)

export default router