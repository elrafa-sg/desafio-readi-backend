import app from './app'
import { API_HOST, API_PORT } from './config'

app.listen(API_PORT, () =>
    console.log(`Servidor rodando com sucesso: ${API_HOST}:${API_PORT}`)
)