import { PrismaClient } from '../../generated/prisma/client';

let prisma = new PrismaClient();

export default prisma;

/**
 * La forma más conveniente de exportar la conexión para un servidor
 * que se mantiene encendido y requiere realizar transacciones delicadas
 * El cliente Prisma está escrito en Rust y es eficiente en el manejo
 * de conexiones y distribuir el pool de las mismas.
 */
