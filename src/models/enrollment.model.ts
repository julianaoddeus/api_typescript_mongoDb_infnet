import mongoose, { Document } from "mongoose";
import type { EnrollmentEnum } from "../enums/enrollment.enum.js";
import { enrollmentSchema } from "../schemas/enrollment.schema.js";

export interface IEnrollment extends Document {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentEnum;
  enrolledAt: Date;
  canceledAt: Date;
}

export type EnrollmentInput = Omit<
  IEnrollment,
  "id" | "userId" | "courserId" | "enrolledAt"
>;

enrollmentSchema.index({ username: 1, email: 1 });

export const EnrollmentModel = mongoose.model<IEnrollment>(
  "enrollments",
  enrollmentSchema,
);
