import { Request, Response } from 'express'
import { compareSync, hashSync } from 'bcrypt'

import { prismaClient } from '../helpers/database'
import { generateTokens } from '../helpers/auth'

class UsuarioController {
    public async login (req: Request, res: Response) {
        const { email, senha } = req.body

        const usuario = await prismaClient.usuario.findFirst({
            where: { email: email }
        })

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário ou senha inválidos!' })
        }
        else {
            // aqui faz o hash da senha no banco somente para testar
            // se houvesse cadastro ela já estaria salva encriptada
            const encryptedSavedPassword = hashSync(usuario.senha, 10)
            if (compareSync(senha, encryptedSavedPassword)) {
                return res.status(200).json({
                    access_token: generateTokens({
                        id: usuario.id,
                        role: usuario.role
                    }),
                    email: usuario.email
                })
            }
            else {
                return res.status(404).json({ message: 'Usuário ou senha inválidos!' })
            }
        }
    }
}

export { UsuarioController }