import mongoose from "mongoose";
import { courseSchema } from "../validators/course.validator.js";

export interface ICourse {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  stock: number;
  imageURL: string;
}

export type CourseInput = Omit<ICourse, "id">;

courseSchema.index({ name: 1 });

export const CourseModel = mongoose.model<ICourse>("courses", courseSchema);
