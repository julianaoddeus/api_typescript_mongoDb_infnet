import type { ICourse, CourseInput } from "../models/courses.model.js";
import type { CourseRepository } from "../repository/course.repository.js";

export class CourseService {
  constructor(private repository: CourseRepository) {}

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(courseId: string) {
    const course = await this.repository.findOne(courseId);

    if (!course) throw { status: 404, message: "Curso não encontrado." };

    return course;
  }

  async insert(course: CourseInput) {
    return await this.repository.insert(course);
  }

  async update(courseId: string, data: CourseInput) {
    const course = await this.repository.update(courseId, data);

    if (!course) throw { status: 404, message: "Curso não encontrado." };

    return course;
  }

  async delete(courseId: string) {
    const course = await this.repository.findOne(courseId);

    if (!course) throw { status: 404, message: "Curso não encontrado." };

    return await this.repository.delete(courseId);
  }
}
