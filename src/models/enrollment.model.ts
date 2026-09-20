import mongoose from "mongoose";
import type { EnrollmentEnum } from "../enums/enrollment.enum.js";
import { enrollmentSchema } from "../validators/enrollment.validator.js";

export interface IEnrollment  {
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
