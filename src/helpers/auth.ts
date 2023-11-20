import jwt from 'jsonwebtoken'
import { ACCESS_EXPIRES, ACCESS_SECRET } from '../config'

export function generateTokens (dataToEncript: any) {
    return jwt.sign(dataToEncript, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES })
}

export function verifyToken (token: any) {
    return jwt.verify(token, ACCESS_SECRET)
}