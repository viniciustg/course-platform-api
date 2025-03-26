import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  sub: number;
  iat: number;
  exp: number;
}

export function ensureAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token ausente' });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret) as unknown as TokenPayload;

    req.user = { id: decoded.sub }; // <-- aqui é onde o TypeScript precisa reconhecer o `.user`

    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}
