import type { UserService } from "../services/user.service.js";
import {
  Route,
  Middlewares,
  Controller,
  SuccessResponse,
  Body,
  Post,
  Get,
  Path,
  Put,
  Delete,
  Security,
} from "tsoa";
import { requireAuth } from "../middlewares/require-auth.middleware.js";
import { UserRole } from "../enums/user.enum.js";
import { requireRole } from "../middlewares/role.middleware.js";
import type { IUser, UserInput } from "../models/users.model.js";

@Route("users")
export class UserController extends Controller {
  constructor(private service: UserService) {
    super();
  }

  @SuccessResponse("200", "Ok")
  @Security("jwt")
  @Middlewares(requireAuth, requireRole(UserRole.ADMIN))
  @Get()
  public async getAll() {
    return await this.service.findAll();
  }

  @SuccessResponse("200", "Ok")
  @Security("jwt")
  @Middlewares(requireAuth, requireRole(UserRole.ADMIN))
  @Get("{userId}")
  public async getOne(@Path() userId: string) {
    return await this.service.findOne(userId);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async create(@Body() user: UserInput): Promise<IUser | null> {
    const newUser = await this.service.insert(user);
    this.setStatus(201);

    return newUser;
  }

  @SuccessResponse("200", "Ok")
  @Middlewares(requireAuth, requireRole(UserRole.ADMIN))
  @Put("{userId}")
  public async update(
    @Path() userId: string,
    @Body() data: UserInput,
  ): Promise<IUser | null> {
    return await this.service.update(userId, data);
  }

  @SuccessResponse("204", "No Content")
  @Middlewares(requireAuth, requireRole(UserRole.ADMIN))
  @Delete("{userId}")
  public async delete(@Path() userId: string): Promise<void> {
    await this.service.delete(userId);
  }
}
