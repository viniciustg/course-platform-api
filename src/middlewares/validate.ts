import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

// Middleware genérico para validar corpo da requisição
export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Extrai as mensagens de erro do Zod
      const errors = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      res.status(400).json({ errors });
      return;
    }

    // Substitui req.body pelo objeto validado (com tipos corretos)
    req.body = result.data;

    next();
  };