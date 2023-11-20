require('dotenv').config();

export const API_PORT = process.env.PORT || '3000'
export const API_HOST = process.env.HOSTNAME || 'localhost'

export const ACCESS_EXPIRES = '1d'
export const ACCESS_SECRET = 'quarentaedois'