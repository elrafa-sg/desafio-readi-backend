require('dotenv').config();

export const API_PORT = process.env.PORT || '3000'
export const API_HOST = process.env.HOSTNAME || 'localhost'

export const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES || '1d'
export const ACCESS_SECRET = process.env.ACCESS_SECRET || 'quarentaedois'

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || ''
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || ''
export const AWS_REGION = process.env.AWS_REGION
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET
