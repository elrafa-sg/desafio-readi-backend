import express from 'express'

import usuarioRoutes from './usuarioRouter'

const router = express.Router()

router.use('/usuario', usuarioRoutes)

export default router