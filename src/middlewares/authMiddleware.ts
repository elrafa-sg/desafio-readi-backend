import { type NextFunction, type Request, type Response } from 'express'
import { verifyToken } from '../helpers/auth'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) {
            return res.status(401).send({ message: 'O token não foi informado' })
        }

        const decoded: any = verifyToken(token)
        req.body.idUsuario = decoded.id
        req.body.roleUsuario = decoded.role
        next()
    } catch (err) {
        return res.status(403).send('O token já expirou')
    }
}

export { authMiddleware }