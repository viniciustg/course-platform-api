import { Router } from 'express';
import { ensureAuth } from '../middlewares/ensureAuth';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from '../controllers/course.controller';

import { validate } from '../middlewares/validate';
import {
  createCourseSchema,
  updateCourseSchema
} from '../schemas/course.schema';

const router = Router();

// Protege todas as rotas com ensureAuth
router.use(ensureAuth);

// CRUD de cursos
router.post('/', validate(createCourseSchema), createCourse);
router.put('/:id', validate(updateCourseSchema), updateCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.delete('/:id', deleteCourse);

export default router;