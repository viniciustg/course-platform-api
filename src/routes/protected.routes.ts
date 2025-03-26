import { Router } from 'express';
import { ensureAuth } from '../middlewares/ensureAuth';

const router = Router();

router.get('/me', ensureAuth, (req, res) => {
  res.json({ message: 'Usuário autenticado!', userId: req.user.id });
});

export default router;
