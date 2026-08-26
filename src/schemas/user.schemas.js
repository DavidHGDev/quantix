import * as z from "zod"

//Const para definir las variables que enumenta, utilizando z.enum().
const tiposDeDocumentos = ['CC', 'NIT', 'PP'];
const roles = ['ADMIN', 'VENDEDOR', 'TESTER'];

//Esquema para crear usuarios, con validaciones estrictas y otras opcionales. 
export const createUserSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().optional(),
    tipoDocumento: z.enum(tiposDeDocumentos),
    documento: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(roles).optional()
});

//El usuario solo puede modificar algunos datos
export const updateUserSchema = createUserSchema.omit({ documento: true, role: true, password: true }).partial();

//El administrador puede  modificar todo, y cambiar el estado. y se agrega partial() para indica que los campos son opcionales
export const adminUpdateUserSchema = createUserSchema.extend({ isActive: z.boolean() }).partial();

//Solo modificar la contraseña, solo debe permitir ese cambio del campo password.
export const passwordUpdate = createUserSchema.pick({ password: true });

export const loginUser = createUserSchema.pick({ password: true, email: true })

export const idParamsSchema = z.object({
    id: z.coerce.number().positive()
});