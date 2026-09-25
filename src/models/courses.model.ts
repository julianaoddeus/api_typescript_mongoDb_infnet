import mongoose, { Document } from "mongoose";
import { courseSchema } from "../schemas/course.schema.js";

export interface ICourse extends Document{
  id: string;
  name: string;
  description: string;
  startDate: Date;
  stock: number;
  imageURL: string;
}

export interface CourseInput extends Document {
  name: string;
  description: string;
  startDate: Date;
  stock: number;
  imageURL: string;
}

export const CourseModel = mongoose.model<ICourse>("courses", courseSchema);
