import { PrismaClient } from '../../generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

export default prisma;

/**
*En la versión de prisma 7, se debe utilizar el adaptador. 
*Si no se utiliza, no funciona.
 */
