import { CourseInput, CourseModel, ICourse } from "../models/courses.model.js";

export class CourseRepository {
  public async findAll(): Promise<ICourse[]> {
    return await CourseModel.find();
  }

  public async findOne(courseId: string): Promise<ICourse | null> {
    return await CourseModel.findById(courseId);
  }

  async create(course: CourseInput): Promise<ICourse | null> {
    const newCourse = new CourseModel(course);
    return newCourse.save();
  }

  async update(courseId: string, data: CourseInput) {
    return await CourseModel.findByIdAndUpdate(courseId, data, { new: true });
  }

  async delete(courseId: string) {
    return await CourseModel.findByIdAndDelete(courseId);
  }
}
