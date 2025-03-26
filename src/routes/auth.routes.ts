import { Router } from 'express';
import { register, login, refreshToken } from '../controllers/auth.controller';

const router = Router();

// Rota para registrar novo usuário
router.post('/register', register);

// Rota para login e geração de tokens
router.post('/login', login);

// Rota para renovar o JWT com refresh token
router.post('/refresh', refreshToken);

export default router;