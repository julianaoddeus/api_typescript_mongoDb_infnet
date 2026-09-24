import { Schema } from "mongoose";
import { IEnrollment } from "../models/enrollment.model.js";

export const enrollmentSchema = new Schema<IEnrollment>(
  {
    userId: {
      type: Schema.Types.ObjectId as unknown as StringConstructor,
      ref: "users",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId as unknown as StringConstructor,
      ref: "courses",
      required: true,
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
