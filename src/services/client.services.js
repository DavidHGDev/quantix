import prisma from "../lib/prisma.js";

class ClientServices {
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