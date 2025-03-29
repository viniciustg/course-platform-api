import request from 'supertest';
import app from '../src/app'; // ou server
import { prisma } from '../src/lib/prisma';

describe('Auth', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  it('deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'teste@example.com',
        password: '123456',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve fazer login com sucesso', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'teste@example.com',
        password: '123456',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
