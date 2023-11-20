import { Request, Response } from 'express'
import { prismaClient } from '../helpers/database'

class SolicitacaoController {
    public async get (req: Request, res: Response) {
        try {
            const { idUsuario, roleUsuario } = req.body

            const listaSolicitacoes = await prismaClient.solicitacao.findMany({
                where: { idSolicitante: roleUsuario == 'CLIENTE' ? idUsuario : undefined }
            })

            res.status(200).json(listaSolicitacoes)
        } catch (err) {
            console.warn(err)
            res.status(500).json({ message: 'O servidor não conseguiu processar sua requisição. Tente novamente mais tarde!' })
        }
    }

    public async getById (req: Request, res: Response) {
        try {
            const { id } = req.params
            const { idUsuario, roleUsuario } = req.body
            const solicitacao = await prismaClient.solicitacao.findFirst({
                where: {
                    id: parseInt(id),
                    idSolicitante: roleUsuario == 'CLIENTE' ? idUsuario : undefined
                }
            })

            res.status(200).json(solicitacao)
        }
        catch (err) {
            console.warn(err)
            res.status(500).json({ message: 'O servidor não conseguiu processar sua requisição. Tente novamente mais tarde!' })
        }
    }

    public async create (req: Request, res: Response) {
        try {
            const solicitacaoData = req.body

            const createdSolicitacao = await prismaClient.solicitacao.create({
                data: solicitacaoData
            })

            res.status(201).json(createdSolicitacao)
        } catch (err) {
            console.warn(err)
            res.status(500).json({ message: 'O servidor não conseguiu processar sua requisição. Tente novamente mais tarde!' })
        }
    }

    public async update (req: Request, res: Response) {
        try {
            const { id } = req.params
            const { idUsuario, roleUsuario, status } = req.body

            const updatedSolicitacao = await prismaClient.solicitacao.update({
                where: {
                    id: parseInt(id),
                    idSolicitante: roleUsuario == 'CLIENTE' ? idUsuario : undefined
                },
                data: {
                    status: status
                }
            })

            res.status(200).json(updatedSolicitacao)
        }
        catch (err) {
            console.warn(err)
            res.status(500).json({ message: 'O servidor não conseguiu processar sua requisição. Tente novamente mais tarde!' })
        }
    }

    public async delete (req: Request, res: Response) {
        try {
            const { id } = req.params
            const { idUsuario, roleUsuario } = req.body

            const solicitacao = await prismaClient.solicitacao.findFirst({
                where: {
                    id: parseInt(id),
                }
            })

            if (solicitacao) {
                if (roleUsuario === 'ADMINISTRADOR') {
                    await prismaClient.solicitacao.delete({
                        where: { id: solicitacao.id }
                    })
                }
                else {
                    if (solicitacao?.status === 'PENDENTE') {
                        if (solicitacao.idSolicitante == idUsuario) {
                            await prismaClient.solicitacao.delete({
                                where: { id: solicitacao.id }
                            })
                            res.status(200).json({ message: 'Solicitação deletada com sucesso!' })
                        }   
                        else {
                            res.status(401).json({ message: 'Esta solicitação pertence a outro usuário e você não possui permissão para deletá-la!' })
                        }
                    }
                    else {
                        res.status(401).json({ message: `Você só pode deletar permissões com status de solicitação 'PENDENTE'!` })
                    }
                }
            }
            else {
                res.status(404).json({ message: 'Solicitação não encontrada!' })
            }
        }
        catch (err) {
            console.warn(err)
            res.status(500).json({ message: 'O servidor não conseguiu processar sua requisição. Tente novamente mais tarde!' })
        }
    }
}

export { SolicitacaoController }