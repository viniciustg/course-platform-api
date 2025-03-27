import { PrismaClient } from '@prisma/client';

// Cria uma instância única do Prisma para reutilizar no app
export const prisma = new PrismaClient();