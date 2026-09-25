import { UserInput, UserModel, type IUser } from "../models/users.model.js";
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

  public async insert(user: UserInput): Promise<string> {
    let newUser = new UserModel(user);
    newUser = await newUser.save();
    return newUser._id.toString();
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
