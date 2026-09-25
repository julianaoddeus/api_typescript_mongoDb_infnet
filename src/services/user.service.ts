import bcrypt from "bcrypt";
import type { UserInput, IUser } from "../models/users.model.js";
import type { UserRepository } from "../repository/user.repository.js";
import { UserRole } from "../enums/user.enum.js";

export class UserService {
  constructor(private repository: UserRepository) {}

  public async findAll() {
    return await this.repository.findAll();
  }

  public async findOne(userId: string) {
    const user = await this.repository.findOne(userId);

    if (!user) throw { status: 404, message: "Usuário não encontrado." };

    return user;
  }

  public async findByEmailOrUsername(identifier: string) {
    const user = await this.repository.findByEmailOrUsername(identifier);

    if (!user) throw { status: 404, message: "Usuário não encontrado." };

    return user;
  }

  public async insert(user: UserInput) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = {
      ...user,
      password: hashedPassword,
      role: UserRole.READER,
    };

    return await this.repository.insert(newUser);
  }

  public async update(userId: string, data: UserInput) {
    const user = await this.repository.update(userId, data);

    if (!user) {
      throw {
        status: 404,
        message: "Usuário não encontrado.",
      };
    }

    return user;
  }

  public async delete(userId: string) {
    const user = await this.repository.findOne(userId);

    if (!user) throw { status: 404, message: "Usuário não encontrado." };

    return await this.repository.delete(userId);
  }
}
