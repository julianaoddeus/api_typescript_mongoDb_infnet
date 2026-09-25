import { Error } from "mongoose";
import { CourseInput, CourseModel, ICourse } from "../models/courses.model.js";

export class CourseRepository {
  public async findAll(): Promise<ICourse[]> {
    return await CourseModel.find();
  }

  public async findOne(courseId: string): Promise<ICourse | null> {
    return await CourseModel.findById(courseId);
  }

  async insert(course: CourseInput): Promise<string> {
    let newCourse = new CourseModel(course);
    newCourse = await newCourse.save();
    return newCourse._id.toString();
  }

  async update(courseId: string, data: CourseInput): Promise<ICourse | null> {
    return await CourseModel.findByIdAndUpdate(courseId, data, { new: true });
  }

  async delete(courseId: string) {
    return await CourseModel.findByIdAndDelete(courseId);
  }
}
