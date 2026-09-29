import * as z from "zod";

const detalleOrdenSchema = z.object({
    productoId: z.number().int().positive(),
    cantidad: z.number().int().positive("La cantidad debe ser mayor a 0"),
    priceCompra: z.number().positive("El precio de compra debe ser mayor a 0")
});

export const orderSchema = z.object({
    proveedorId: z.number().int().positive(),
    detalles: z.array(detalleOrdenSchema).min(1, "La orden debe tener al menos un producto")
});

export const updateOrderStatusSchema = z.object({
    estado: z.enum(['PENDIENTE', 'RECIBIDA', 'CANCELADA'])
});