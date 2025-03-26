import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

// Handler de registro
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.register(email, password);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Handler de login
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { token, refreshToken } = await AuthService.login(email, password);
    res.status(200).json({ token, refreshToken });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Captura o token de refresh do corpo da requisição
    const { refreshToken } = req.body;

    // Chama o serviço que valida o refresh e gera novos tokens
    const result = await AuthService.refresh(refreshToken);

    // Retorna os novos tokens para o usuário
    res.status(200).json(result);
  } catch (err: any) {
    // Em caso de erro (ex: refresh token inválido ou expirado)
    res.status(401).json({ error: err.message });
  }
};