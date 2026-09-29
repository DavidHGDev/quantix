import * as z from "zod";

const detalleVentaSchema = z.object({
    productoId: z.number().int().positive("Producto inválido"),
    cantidad: z.number().int().positive("La cantidad debe ser mayor a 0"),
    precioUnitario: z.number().positive("El precio debe ser mayor a 0")
});

export const createInvoiceSchema = z.object({
    clienteId: z.number().int().positive("Cliente obligatorio"),
    metodoDePago: z.enum(['EFECTIVO', 'TRANSFERENCIA', 'CREDITO']),
    detalles: z.array(detalleVentaSchema).min(1, "La venta debe incluir al menos un producto")
});

export const createPaymentSchema = z.object({
    montoAbono: z.number().positive("El abono debe ser mayor a 0"),
    metodoPago: z.enum(['EFECTIVO', 'TRANSFERENCIA']),
    nota: z.string().optional()
});