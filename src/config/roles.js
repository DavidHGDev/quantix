export const ROLES = {
    ADMIN: 'ADMIN',
    VENDEDOR: 'VENDEDOR',
    TESTER: 'TESTER'
}

export const PERMISOS = {
    //Módulo de usuarios
    LEER_USUARIOS: [ROLES.ADMIN],
    ESCRIBIR_USURIOS: [ROLES.ADMIN],
    ELIMINAR_USUARIOS: [ROLES.ADMIN],

    // Módulo de clientes
    LEER_CLIENTES: [ROLES.ADMIN, ROLES.VENDEDOR],
    ESCRIBIR_CLIENTES: [ROLES.ADMIN, ROLES.VENDEDOR],
    ELIMINAR_CLIENTES: [ROLES.ADMIN], // Solo el Admin puede inactivar clientes

    // Módulo de Inventario (Categorías, Productos, Proveedores)
    LEER_INVENTARIO: [ROLES.ADMIN, ROLES.VENDEDOR],
    ESCRIBIR_INVENTARIO: [ROLES.ADMIN],
    ELIMINAR_INVENTARIO: [ROLES.ADMIN],

    // Módulo de Compras
    LEER_COMPRAS: [ROLES.ADMIN, ROLES.VENDEDOR],
    ESCRIBIR_COMPRAS: [ROLES.ADMIN]
}