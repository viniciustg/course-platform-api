import express from 'express';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());

// Rotas de autenticação
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API está rodando 🚀');
});

export default app;