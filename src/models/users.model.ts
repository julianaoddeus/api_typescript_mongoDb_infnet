import mongoose from "mongoose";
import type { UserRole } from "../enums/user.enum.js";
import { userSchema } from "../validators/user.validator.js";

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export type LoginInput = {
  identifier: string;
  password: string;
};

export type UserInput = Omit<IUser, "role">;

userSchema.index({ username: 1, email: 1 });

export const UserModel = mongoose.model<IUser>("users", userSchema);
