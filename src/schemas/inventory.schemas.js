import * as z from "zod";

// --- CATEGORÍAS ---
export const createCategorySchema = z.object({
    nameCategorie: z.string().min(2, "El nombre de la categoría es muy corto"),
    description: z.string().optional()
});
export const updateCategorySchema = createCategorySchema.partial();

// --- PROVEEDORES ---
export const createSupplierSchema = z.object({
    tipoDocumento: z.enum(['CC', 'NIT', 'PP']),
    documento: z.string().min(3, "El documento es obligatorio"),
    razonSocial: z.string().min(3, "La razón social es obligatoria"),
    phone: z.string().min(7, "Teléfono inválido"),
    email: z.string().email("Correo inválido")
});
export const updateSupplierSchema = createSupplierSchema.partial().extend({
    isActive: z.boolean().optional()
});

// --- PRODUCTOS ---
export const createProductSchema = z.object({
    codigoBarras: z.string().min(3, "Código de barras inválido"),
    nameProduct: z.string().min(2, "Nombre de producto inválido"),
    stock: z.number().int().nonnegative().default(0),
    priceVenta: z.number().positive("El precio debe ser mayor a 0"),
    categoriaId: z.number().int().positive("Categoría inválida"),
    supplierIds: z.array(z.number().int()).optional() // Array de IDs de proveedores
});
export const updateProductSchema = createProductSchema.omit({ stock: true }).partial();