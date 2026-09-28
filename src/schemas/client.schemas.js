import * as z from "zod";

const tiposDeDocumentos = ['CC', 'NIT', 'CE', 'PP'];

export const createClientSchema = z.object({
    firstName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    lastName: z.string().optional(),
    tipoDocumento: z.enum(tiposDeDocumentos),
    documento: z.string().min(3, "El documento es obligatorio"),
    email: z.string().email("Correo electrónico inválido").optional().or(z.literal('')),
    phone: z.string().optional(),
    address: z.string().optional(),
    isActive: z.boolean().optional() // Prisma ya le pone true por defecto, pero lo validamos
});

// Para actualizar, todos los campos se vuelven opcionales con .partial()
export const updateClientSchema = createClientSchema.partial();

// Esquema para validar el ID en los params
export const idParamsSchema = z.object({
    id: z.coerce.number().positive("El ID debe ser un número positivo")
});

// Esquema para validar la búsqueda por documento
export const documentoParamsSchema = z.object({
    documento: z.string().min(3, "El documento debe tener al menos 3 caracteres")
});

// Esquema para validar la búsqueda por email
export const emailParamsSchema = z.object({
    email: z.string().email("Debe ser un correo electrónico válido")
});