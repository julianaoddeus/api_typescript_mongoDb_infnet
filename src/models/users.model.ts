import mongoose, { Document } from "mongoose";
import type { UserRole } from "../enums/user.enum.js";
import { userSchema } from "../schemas/user.schema.js";

export interface IUser  {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export type LoginInput = {
  identifier: string;
  password: string;
};

export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export const UserModel = mongoose.model<IUser>("users", userSchema);
