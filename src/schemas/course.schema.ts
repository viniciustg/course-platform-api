import { z } from 'zod';

// Esquema de criação de curso
export const createCourseSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve ter no mínimo 3 caracteres'),
  description: z
    .string()
    .min(10, 'A descrição deve ter no mínimo 10 caracteres'),
});

// Esquema de atualização de curso (todos campos opcionais)
export const updateCourseSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
});
