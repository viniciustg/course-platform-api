import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user = await AuthService.register(email, password);
      return res.status(201).json({ id: user.id, email: user.email });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const { token, refreshToken } = await AuthService.login(email, password);
      return res.status(200).json({ token, refreshToken });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
