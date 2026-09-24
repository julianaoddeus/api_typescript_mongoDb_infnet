import { Schema } from "mongoose";
import { IEnrollment } from "../models/enrollment.model.js";
import { EnrollmentEnum } from "../enums/enrollment.enum.js";

export const enrollmentSchema = new Schema<IEnrollment>(
  {
    userId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(EnrollmentEnum),
    },
    enrolledAt: {
      type: Date,
      required: true,
    },
    canceledAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

enrollmentSchema.index({ username: 1, email: 1 });
