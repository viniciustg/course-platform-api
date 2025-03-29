import request from 'supertest';
import app from '../src/app'; // importa sua instância do Express
import { prisma } from '../src/lib/prisma';

let token: string;

beforeAll(async () => {
  // Limpa o banco antes dos testes
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Cria e loga um usuário de teste
  await request(app).post('/auth/register').send({
    email: 'vinicius@dev.com',
    password: '123456'
  });

  const loginRes = await request(app).post('/auth/login').send({
    email: 'vinicius@dev.com',
    password: '123456'
  });

  token = loginRes.body.token;
});

describe('Cursos - Rotas Protegidas', () => {
  let courseId: number;

  it('deve criar um novo curso', async () => {
    const res = await request(app)
      .post('/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Curso de Node.js',
        description: 'Curso avançado para desenvolvedores back-end'
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Curso de Node.js');
    courseId = res.body.id;
  });

  it('deve listar todos os cursos', async () => {
    const res = await request(app)
      .get('/courses')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('deve buscar curso por ID', async () => {
    const res = await request(app)
      .get(`/courses/${courseId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(courseId);
  });

  it('deve atualizar um curso existente', async () => {
    const res = await request(app)
      .put(`/courses/${courseId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Curso Atualizado',
        description: 'Descrição atualizada'
      });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Curso Atualizado');
  });

  it('deve deletar o curso', async () => {
    const res = await request(app)
      .delete(`/courses/${courseId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
