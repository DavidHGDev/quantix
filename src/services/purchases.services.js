import prisma from "../lib/prisma.js";

class PurchasesServices {
    async getOrders() {
        return await prisma.order.findMany({
            include: {
                proveedor: { select: { razonSocial: true, documento: true } },
                usuario: { select: { firstName: true, email: true } },
                detalles: true
            },
            orderBy: { fecha: 'desc' }
        });
    }

    async getOrderById(id) {
        return await prisma.order.findUnique({
            where: { id },
            include: {
                proveedor: true,
                detalles: {
                    include: { producto: { select: { nameProduct: true, codigoBarras: true } } }
                }
            }
        });
    }

    async createOrder(userId, data) {
        return await prisma.order.create({
            data: {
                userId, // Lo tomamos del token JWT
                proveedorId: data.proveedorId,
                estado: 'PENDIENTE',
                detalles: {
                    create: data.detalles
                }
            },
            include: { detalles: true }
        });
    }

    async updatePendingOrder(orderId, data) {
        // 1. Verificamos el estado actual
        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) throw new Error("Orden no encontrada");
        if (order.estado !== 'PENDIENTE') throw new Error("Solo puedes modificar órdenes PENDIENTES");

        // 2. Reemplazamos toda la orden y sus detalles
        return await prisma.order.update({
            where: { id: orderId },
            data: {
                proveedorId: data.proveedorId,
                detalles: {
                    deleteMany: {}, // Borra los detalles anteriores
                    create: data.detalles   // Inserta la nueva lista corregida
                }
            },
            include: { detalles: true }
        });
    }

    async changeOrderStatus(orderId, newStatus) {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { detalles: true }
        });

        if (!order) throw new Error("Orden no encontrada");
        
        // Evitar reprocesar órdenes
        if (order.estado !== 'PENDIENTE') {
            throw new Error(`La orden ya fue ${order.estado} y no puede ser alterada.`);
        }

        // Si el estado es RECIBIDA, ejecutamos la transacción de inventario
        if (newStatus === 'RECIBIDA') {
            return await prisma.$transaction(async (tx) => {
                // A. Actualizamos la orden
                const updatedOrder = await tx.order.update({
                    where: { id: orderId },
                    data: { estado: 'RECIBIDA' }
                });

                // B. Incrementamos el stock por cada producto en la orden
                for (const detalle of order.detalles) {
                    await tx.product.update({
                        where: { id: detalle.productoId },
                        data: { stock: { increment: detalle.cantidad } }
                    });
                }

                return updatedOrder;
            });
        }

        // Si el estado es CANCELADA, solo cambiamos el estado, el stock no se toca
        return await prisma.order.update({
            where: { id: orderId },
            data: { estado: newStatus }
        });
    }
}

export default new PurchasesServices();