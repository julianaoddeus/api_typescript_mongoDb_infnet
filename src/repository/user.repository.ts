import { UserInput, UserModel, type IUser } from "../models/users.model.js";

import FilterQuery from "mongoose";

export class UserRepository {
  public async findAll(): Promise<IUser[]> {
    return await UserModel.find();
  }

  public async findOne(userId: string): Promise<IUser | null> {
    return await UserModel.findById(userId);
  }

  public async findByEmailOrUsername(identifier: string) {
    const normalizeIdentifier = identifier.trim().toLowerCase();

    return UserModel.findOne({
      $or: [{ email: normalizeIdentifier }, { username: normalizeIdentifier }],
    });
  }

  public async create(user: UserInput): Promise<IUser> {
    const newUser = new UserModel(user);
    return newUser.save();
  }

  public async update(userId: string, data: UserInput): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(userId, data, {
      new: true,
    });
  }

  public async delete(userId: string) {
    return UserModel.findByIdAndDelete(userId);
  }
}
