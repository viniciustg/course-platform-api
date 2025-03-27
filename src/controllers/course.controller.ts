import { Request, Response } from 'express';
import { CourseService } from '../services/course.service';
import { CacheService } from '../services/cache.service';

// Cria um novo curso
export const createCourse = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { id: authorId } = req.user;

  const course = await CourseService.create({ title, description, authorId });
  res.status(201).json(course);
};

// Lista todos os cursos
export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  const cacheKey = 'courses:all';

  // 1. Verifica se há cache
  const cached = await CacheService.get(cacheKey);
  if (cached) {
    res.json({ fromCache: true, data: cached });
    return;
  }

  // 2. Busca do banco
  const courses = await CourseService.findAll();

  // 3. Salva no cache por 60 segundos
  await CacheService.set(cacheKey, courses, 60);

  res.json({ fromCache: false, data: courses });
};

// Busca curso por ID
export const getCourseById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const course = await CourseService.findById(id);
  
    if (!course) {
      res.status(404).json({ error: 'Curso não encontrado' });
      return;
    }
  
    res.json(course);
  }

// Atualiza um curso
export const updateCourse = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description } = req.body;
  const course = await CourseService.update(id, { title, description });
  await CacheService.del('courses:all');
  res.json(course);
};

// Deleta um curso
export const deleteCourse = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await CourseService.delete(id);
  await CacheService.del('courses:all');
  res.status(204).send();
};