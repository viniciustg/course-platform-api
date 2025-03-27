import { Router } from 'express';
import { ensureAuth } from '../middlewares/ensureAuth';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from '../controllers/course.controller';

const router = Router();

// Protege todas as rotas com ensureAuth
router.use(ensureAuth);

// CRUD de cursos
router.post('/', createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;