import express from 'express';
import authRoutes from './routes/auth.routes';
import protectedRoutes from './routes/protected.routes';
import courseRoutes from './routes/course.routes';

const app = express();

app.use(express.json());

// Rotas de autenticação
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/courses', courseRoutes);

export default app;