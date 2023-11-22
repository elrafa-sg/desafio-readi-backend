require('dotenv').config();

export const API_PORT = process.env.PORT || '4000'
export const API_HOST = process.env.HOSTNAME || 'localhost'

export const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES || '1d'
export const ACCESS_SECRET = process.env.ACCESS_SECRET || 'quarentaedois'

