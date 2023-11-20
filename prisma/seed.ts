import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function seedDatabase () {
    await prisma.usuario.createMany({
        data: [
            { email: 'cliente01@email.com', senha: 'senha01', role: 'CLIENTE' },
            { email: 'cliente02@email.com', senha: 'senha02', role: 'CLIENTE' },
            { email: 'operador@email.com', senha: 'senha03', role: 'OPERADOR' },
            { email: 'administrador@email.com', senha: 'senha04', role: 'ADMINISTRADOR' }
        ],
        skipDuplicates: true
    })
}

seedDatabase()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })