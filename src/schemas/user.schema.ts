import { Schema } from "mongoose";
import type { IUser } from "../models/users.model.js";
import { UserRole } from "../enums/user.enum.js";

export const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Nome é obrigatório."],
    minlength: [3, "Nome deve ter pelo menos 3 caracteres."],
    maxLength: [200, "Nome de usuário deve ter no máximo 200 caracteres."],
  },
  email: {
    type: String,
    required: [true, "E-mail é obrigatório."],
    lowercase: true,
    unique: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "E-mail inválido"],
  },
  password: {
    type: String,
    required: [true, "Senha é obrigatória"],
    minlength: [6, "Senha deve ter pelo menos 6 caracteres"],
    maxLength: [100, "Senha deve ter no máximo 100 caracteres"],
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
  },
});

userSchema.index({ username: 1, email: 1 });
