import { Body, Post, Route, SuccessResponse } from "tsoa";
import type { LoginInput } from "../models/users.model.js";
import { AuthService } from "../services/auth.service.js";
@Route("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @SuccessResponse("200", "Login realizado com sucesso")
  @Post("login")
  public async login(@Body() credentials: LoginInput) {
    return await this.authService.login(credentials);
  }
}
