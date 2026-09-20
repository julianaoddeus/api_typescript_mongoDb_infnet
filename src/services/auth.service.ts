import { LoginInput } from "../models/users.model.js";
import { UserService } from "./user.service.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor(private userService: UserService) {}

  public async login(credentials: LoginInput) {
    const { identifier, password } = credentials;

    const user = await this.userService.findByEmailOrUsername(identifier);

    if (!user) throw { status: 400, message: "Credenciais inválidas." };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw { status: 400, message: "Credenciais inválidas." };

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET não configurado");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      secret,
      {
        expiresIn: "1d",
      },
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
