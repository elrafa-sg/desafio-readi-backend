import { Request, Response } from 'express'
import { prismaClient } from '../helpers/database'

class SolicitacaoController {
    public async get (req: Request, res: Response) {
        const solicitacaoList = await prismaClient.solicitacao.findMany()
        res.status(200).json(solicitacaoList)
    }

    public async getById (req: Request, res: Response) {
        const { id } = req.params

        const solicitacao = await prismaClient.solicitacao.findFirst({
            where: { id: parseInt(id) }
        })

        res.status(200).json(solicitacao)
    }

    public async create (req: Request, res: Response) {
        const solicitacaoData = req.body

        const createdSolicitacao = await prismaClient.solicitacao.create({
            data: solicitacaoData
        })

        res.status(201).json(createdSolicitacao)
    }

    public async update (req: Request, res: Response) {
        const { id } = req.params
        const { status } = req.body

        const updatedSolicitacao = await prismaClient.solicitacao.update({
            where: { id: parseInt(id), idSolicitante: 1 },
            data: {
                status: status
            }
        })

        res.status(200).json(updatedSolicitacao)
    }

    public async delete (req: Request, res: Response) {
        const { id } = req.params

        const deletedSolicitacao = await prismaClient.solicitacao.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json(deletedSolicitacao)
    }
}

export { SolicitacaoController }