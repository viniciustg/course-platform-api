import { prisma } from '../lib/prisma';

interface CreateCourseDTO {
  title: string;
  description: string;
  authorId: number;
}

interface UpdateCourseDTO {
  title?: string;
  description?: string;
}

export class CourseService {
  static async create(data: CreateCourseDTO) {
    return prisma.course.create({ data });
  }

  static async findAll() {
    return prisma.course.findMany({
      include: {
        author: {
          select: { id: true, email: true }
        }
      }
    });
  }

  static async findById(id: number) {
    return prisma.course.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, email: true }
        }
      }
    });
  }

  static async update(id: number, data: UpdateCourseDTO) {
    return prisma.course.update({
      where: { id },
      data
    });
  }

  static async delete(id: number) {
    return prisma.course.delete({
      where: { id }
    });
  }
}
