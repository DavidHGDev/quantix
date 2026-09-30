import prisma from "../lib/prisma.js";

class InventoryServices {
    // ================= CATEGORÍAS =================
    async getCategories() {
        return await prisma.categoria.findMany({ orderBy: { nameCategorie: 'asc' } });
    }
    async createCategory(data) {
        return await prisma.categoria.create({ data });
    }

    // ================= PROVEEDORES =================
    async getSuppliers({ search, page = 1, limit = 10, includeInactive = false } = {}) {
        // Si no se envían page y limit, asumimos que es una consulta para un select (sin paginar)
        if (!page && !limit && !search) {
             return await prisma.supplier.findMany({ 
                 where: { isActive: true }, 
                 orderBy: { razonSocial: 'asc' } 
             });
        }

        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        
        const where = {
            ...(includeInactive ? {} : { isActive: true }),
            ...(search ? {
                OR: [
                    { razonSocial: { contains: search, mode: 'insensitive' } },
                    { documento: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } }
                ]
            } : {})
        };

        const [data, total] = await Promise.all([
            prisma.supplier.findMany({
                where,
                skip,
                take,
                include: {
                    _count: { select: { ordenesCompra: true } },
                    ordenesCompra: { where: { estado: 'PENDIENTE' } }
                },
                orderBy: { id: 'desc' }
            }),
            prisma.supplier.count({ where })
        ]);

        return { 
            data, 
            pagination: { 
                total, 
                page: Number(page), 
                totalPages: Math.ceil(total / take) || 1, 
                hasMore: skip + data.length < total 
            } 
        };
    }
    async createSupplier(data) {
        return await prisma.supplier.create({ data });
    }

    // ================= PRODUCTOS =================
    async getProducts({ search, page = 1, limit = 10, includeInactive = false }) {
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        // Construcción dinámica de filtros
        const where = {
            ...(includeInactive ? {} : { isActive: true }),
            ...(search ? {
                OR: [
                    { nameProduct: { contains: search, mode: 'insensitive' } },
                    { codigoBarras: { contains: search, mode: 'insensitive' } }
                ]
            } : {})
        };
        const [data, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take,
                include: {
                    categoria: { select: { nameCategorie: true } },
                    suppliers: { select: { id: true, razonSocial: true } }
                },
                orderBy: { id: 'desc' } // Últimos agregados primero
            }),
            prisma.product.count({ where })
        ]);
        return {
            data,
            pagination: {
                total,
                page: Number(page),
                totalPages: Math.ceil(total / take) || 1,
                hasMore: skip + data.length < total
            }
        };
    }

    async createProduct(data) {
        const { supplierIds, ...productData } = data;
        
        return await prisma.product.create({
            data: {
                ...productData,
                // Conectamos a los proveedores si se enviaron IDs
                suppliers: supplierIds && supplierIds.length > 0 
                    ? { connect: supplierIds.map(id => ({ id })) } 
                    : undefined
            },
            include: { categoria: true, suppliers: true }
        });
    }

    async updateProduct(id, data) {
        const { supplierIds, ...productData } = data;

        return await prisma.product.update({
            where: { id },
            data: {
                ...productData,
                // Si envían un nuevo array de proveedores, Prisma "setea" (reemplaza) la relación
                suppliers: supplierIds 
                    ? { set: supplierIds.map(sid => ({ id: sid })) } 
                    : undefined
            },
            include: { categoria: true, suppliers: true }
        });
    }

    async toggleProductStatus(id, isActive) {
        return await prisma.product.update({
            where: { id },
            data: { isActive }
        });
    }
}

export default new InventoryServices();