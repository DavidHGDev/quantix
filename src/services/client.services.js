import prisma from "../lib/prisma.js";

class ClientServices {

    async getClients({ search, page = 1, limit = 10 }) {
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const where = search ? {
            OR: [
                { documento: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { firstName: { contains: search, mode: 'insensitive' } }
            ]
        } : {};

        const [data, total] = await Promise.all([
            prisma.client.findMany({
                where, skip, take,
                include: {
                    creditos: { where: { isActive: true } } // <-- CRÍTICO PARA LA VISTA 360
                },
                orderBy: { id: 'desc' }
            }),
            prisma.client.count({ where })
        ]);
        return { data, pagination: { total, page: Number(page), totalPages: Math.ceil(total / take) || 1 } };
    }
    
    async getAllClien() {
        // Consultar todos los clientes (Solo los activos) para consultar todos, se quita el where
        return await prisma.client.findMany({
            where: { isActive: true },
            orderBy: { firstName: 'asc' }
        });
    }

    async getOneClient(id) {
        // Consultar solo el cliente por id
        return await prisma.client.findUnique({
            where: { id }
        });
    }

    async getOneClientForDocument(documento) {
        // Consultar un cliente por su documento
        return await prisma.client.findFirst({
            where: { documento }
        });
    }

    async getOneClientForEmail(email) {
        // Consultar un cliente por email
        return await prisma.client.findFirst({
            where: { email }
        });
    }

    async createClient(data) {
        // Crear un cliente
        return await prisma.client.create({
            data
        });
    }
    
    async updateClient(id, data) {
        // Actualizar la información de un cliente
        return await prisma.client.update({
            where: { id },
            data
        });
    }

    async deleteClient(id) {
        // Cambiar estado de active a Disabled (Inactivar)
        return await prisma.client.update({
            where: { id },
            data: { isActive: false }
        });
    }
}

export default new ClientServices();