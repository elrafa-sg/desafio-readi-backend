import express from 'express';
import SwaggerUi from 'swagger-ui-express'
import cors from 'cors'

import router from './routers'

import SwaggerDocs from '../swagger.json'

const app = express()

app.use(cors({
    origin: '*',
    methods: ['*']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.use('/swagger', SwaggerUi.serve, SwaggerUi.setup(SwaggerDocs))

export default app
