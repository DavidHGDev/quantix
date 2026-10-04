import prisma from "../lib/prisma.js";

class SalesServices {
    // ================= FACTURACIÓN =================

    async createSale(userId, data) {
        const { clienteId, metodoDePago, detalles } = data;

        return await prisma.$transaction(async (tx) => {
            // 1. Validar regla de negocio: No dar crédito al Consumidor Final
            if (metodoDePago === 'CREDITO') {
                const cliente = await tx.client.findUnique({ 
                    where: { id: Number(clienteId) },
                    select: { documento: true } 
                });
                
                if (cliente && cliente.documento === '222222222') {
                    throw new Error("No se puede otorgar crédito al Consumidor Final. Seleccione un cliente registrado con cédula válida.");
                }
            }

            let totalFactura = 0;
            const detallesCalculados = [];

            // 2. Validar stock y descontar inventario
            for (const item of detalles) {
                const prod = await tx.product.findUnique({ where: { id: item.productoId } });
                
                if (!prod || !prod.isActive) throw new Error(`Producto #${item.productoId} no disponible`);
                if (prod.stock < item.cantidad) throw new Error(`Stock insuficiente para "${prod.nameProduct}". Disponible: ${prod.stock}`);

                await tx.product.update({
                    where: { id: item.productoId },
                    data: { stock: { decrement: item.cantidad } }
                });

                const subtotal = item.cantidad * item.precioUnitario;
                totalFactura += subtotal;

                detallesCalculados.push({
                    productoId: item.productoId,
                    cantidad: item.cantidad,
                    precioUnitario: item.precioUnitario,
                    subtotal
                });
            }

            // 3. Crear Factura inmutable
            const nuevaFactura = await tx.invoice.create({
                data: {
                    usuarioId: userId,
                    clienteId: Number(clienteId),
                    metodoDePago,
                    totalPagar: totalFactura,
                    detalles: { create: detallesCalculados }
                },
                include: { detalles: true }
            });

            // 4. Generar Crédito automáticamente si aplica
            if (metodoDePago === 'CREDITO') {
                await tx.credit.create({
                    data: {
                        clienteId: Number(clienteId),
                        facturaId: nuevaFactura.id,
                        montoOriginal: totalFactura,
                        saldoCredito: totalFactura,
                        estado: 'PENDIENTE'
                    }
                });
            }

            return nuevaFactura;
        });
    }

    async getInvoices({ page = 1, limit = 10, clienteId = null }) {
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const where = clienteId ? { clienteId: Number(clienteId) } : {};

        const [data, total] = await Promise.all([
            prisma.invoice.findMany({
                where,
                skip,
                take,
                include: {
                    cliente: { select: { firstName: true, lastName: true, documento: true } },
                    usuario: { select: { firstName: true } }
                },
                orderBy: { fecha: 'desc' }
            }),
            prisma.invoice.count({ where })
        ]);

        return { data, pagination: { total, page: Number(page), totalPages: Math.ceil(total / take) || 1 } };
    }

    async getInvoiceById(id) {
        return await prisma.invoice.findUnique({
            where: { id },
            include: {
                cliente: true,
                usuario: { select: { firstName: true, email: true } },
                detalles: { include: { producto: { select: { nameProduct: true, codigoBarras: true } } } },
                credito: { include: { abonos: true } }
            }
        });
    }

    // ================= CARTERA Y ABONOS =================

    async getActiveCredits({ clienteId = null }) {
        const where = { isActive: true };
        if (clienteId) where.clienteId = Number(clienteId);

        return await prisma.credit.findMany({
            where,
            include: {
                cliente: { select: { firstName: true, lastName: true, documento: true, phone: true } },
                factura: { select: { id: true, fecha: true } },
                abonos: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async addPayment(creditId, userId, data) {
        const idCreditoNum = Number(creditId);

        return await prisma.$transaction(async (tx) => {
            const credito = await tx.credit.findUnique({ 
                where: { id: idCreditoNum } 
            });
            
            if (!credito || !credito.isActive) {
                throw new Error("Crédito no encontrado o ya está pagado");
            }
            
            const montoAbono = Number(data.montoAbono);
            const saldoActual = Number(credito.saldoCredito);
            
            if (montoAbono > saldoActual) {
                throw new Error(`El abono excede el saldo pendiente ($${saldoActual})`);
            }

            // 1. Registrar el pago
            const abono = await tx.payment.create({
                data: {
                    creditoId: idCreditoNum,
                    usuarioId: userId,
                    montoAbono,
                    metodoPago: data.metodoPago,
                    nota: data.nota || null
                }
            });

            // 2. Descontar saldo y verificar si se liquidó la deuda
            const nuevoSaldo = saldoActual - montoAbono;
            const estadoActualizado = nuevoSaldo === 0 ? 'PAGADO' : 'PENDIENTE';

            const creditoActualizado = await tx.credit.update({
                where: { id: idCreditoNum },
                data: {
                    saldoCredito: nuevoSaldo,
                    estado: estadoActualizado,
                    isActive: nuevoSaldo > 0
                }
            });

            return { abono, credito: creditoActualizado };
        });
    }
}

export default new SalesServices();