import { Request, Response } from 'express'
import fs from 'fs'
import { prismaClient } from '../helpers/database'
import { AmazonS3 } from '../helpers/amazonS3'
import { API_HOST, API_PORT } from '../config'

class SolicitacaoController {
    public async get (req: Request, res: Response) {
        try {
            const { idUsuario, roleUsuario } = req.body

            const listaSolicitacoes = await prismaClient.solicitacao.findMany({
                where: { idSolicitante: roleUsuario === 'CLIENTE' ? idUsuario : undefined }
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
                    idSolicitante: roleUsuario === 'CLIENTE' ? idUsuario : undefined
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
            const { idUsuario } = req.body
            const solicitacaoData = JSON.parse(JSON.stringify(req.body))
            //const validMimeTypes = ['application/pdf', 'image/png']
            const fileIsValid = true
            //if (req.file?.mimetype && validMimeTypes.includes(req.file.mimetype)) {
            if (fileIsValid) {
                //const urlArquivo = `${API_HOST}:${API_PORT}/${req.file.path}`
                const urlArquivo = 'https://www.africau.edu/images/default/sample.pdf'

                await prismaClient.solicitacao.create({
                    data: {
                        nome: solicitacaoData.nome,
                        cpf: solicitacaoData.cpf,
                        telefone: solicitacaoData.telefone,
                        dataNascimento: solicitacaoData.dataNascimento,
                        logradouro: solicitacaoData.logradouro,
                        numero: solicitacaoData.numero,
                        cidade: solicitacaoData.cidade,
                        uf: solicitacaoData.uf,
                        cep: solicitacaoData.cep,
                        urlCertidao: urlArquivo,
                        idSolicitante: idUsuario
                    }
                })

                res.status(201).json({ message: 'Solicitação criada com sucesso!' })
            }
            else {
                res.status(403).json({ message: 'Formato inválido. O arquivo deve ser um arquivo .pdf ou .png' })
            }
        } catch (err) {
            console.warn(err)
            res.status(500).json({ message: 'O servidor não conseguiu processar sua requisição. Tente novamente mais tarde!' })
        }
    }

    public async update (req: Request, res: Response) {
        try {
            const { id } = req.params
            const { roleUsuario, status } = req.body

            if (roleUsuario === 'CLIENTE') {
                res.status(403).json({ message: 'Você não possui permissão para alterar solicitações!' })
            }
            else {
                const solicitacao = await prismaClient.solicitacao.findFirst({
                    where: { id: parseInt(id) }
                })

                if (solicitacao) {
                    if (roleUsuario === 'OPERADOR') {
                        if (solicitacao.status === 'EMITIDA') {
                            res.status(403).json({ message: `Você não pode alterar solicitações com status 'EMITIDA'!` })
                        }
                        else {
                            await prismaClient.solicitacao.update({
                                where: {
                                    id: parseInt(id)
                                },
                                data: {
                                    status: status
                                }
                            })
                            res.status(200).json({ message: 'Solicitação atualizada com sucesso!' })
                        }
                    }
                    else if (roleUsuario === 'ADMINISTRADOR') {
                        await prismaClient.solicitacao.update({
                            where: {
                                id: parseInt(id)
                            },
                            data: {
                                status: status
                            }
                        })
                        res.status(200).json({ message: 'Solicitação atualizada com sucesso!' })
                    }
                }
                else {
                    res.status(404).json({ message: 'Solicitação não encontrada!' })
                }
            }
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
                    res.status(200).json({ message: 'Solicitação deletada com sucesso!' })
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
                            res.status(403).json({ message: 'Esta solicitação pertence a outro usuário e você não possui permissão para deletá-la!' })
                        }
                    }
                    else {
                        res.status(403).json({ message: `Você só pode deletar permissões com status de solicitação 'PENDENTE'!` })
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