import prisma from '../lib/prisma.js';

export async function getDashboardMetrics(req, res, next) {
    try {
        const fechaActual = new Date();
        const inicioDeMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);

        // Ejecución en paralelo para máximo rendimiento
        const [
            totalClientes,
            productosBajoStock,
            ventasMesAgrupadas,
            carteraAgrupada,
            ventasRecientes
        ] = await Promise.all([
            prisma.client.count({ where: { isActive: true } }),
            
            prisma.product.findMany({
                where: { isActive: true, stock: { lte: 5 } },
                select: { id: true, codigoBarras: true, nameProduct: true, stock: true },
                orderBy: { stock: 'asc' },
                take: 10
            }),

            prisma.invoice.aggregate({
                _sum: { totalPagar: true },
                where: { fecha: { gte: inicioDeMes } }
            }),

            prisma.credit.aggregate({
                _sum: { saldoCredito: true },
                where: { isActive: true }
            }),

            prisma.invoice.findMany({
                take: 5,
                orderBy: { fecha: 'desc' },
                include: {
                    cliente: { select: { firstName: true, lastName: true } }
                }
            })
        ]);

        res.status(200).json({
            clientesActivos: totalClientes,
            ventasDelMes: ventasMesAgrupadas._sum.totalPagar || 0,
            carteraPendiente: carteraAgrupada._sum.saldoCredito || 0,
            alertasStock: productosBajoStock,
            ultimasVentas: ventasRecientes
        });
    } catch (error) {
        next(error);
    }
}