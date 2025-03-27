import { Request, Response } from 'express';
import { CourseService } from '../services/course.service';

// Cria um novo curso
export const createCourse = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { id: authorId } = req.body.user;

  const course = await CourseService.create({ title, description, authorId });
  res.status(201).json(course);
};

// Lista todos os cursos
export const getAllCourses = async (req: Request, res: Response) => {
  const courses = await CourseService.findAll();
  res.json(courses);
};

// Busca curso por ID
export const getCourseById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const course = await CourseService.findById(id);

  if (!course) return res.status(404).json({ error: 'Curso não encontrado' });

  res.json(course);
};

// Atualiza um curso
export const updateCourse = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description } = req.body;
  const course = await CourseService.update(id, { title, description });

  res.json(course);
};

// Deleta um curso
export const deleteCourse = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await CourseService.delete(id);
  res.status(204).send();
};