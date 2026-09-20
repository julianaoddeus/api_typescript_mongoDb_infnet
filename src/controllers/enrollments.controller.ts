import type { EnrollmentService } from "../services/enrollments.service.js";
import {
  Body,
  Get,
  Middlewares,
  Patch,
  Post,
  Put,
  Route,
  Security,
  SuccessResponse,
} from "tsoa";
import { requireAuth } from "../middlewares/require-auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { UserRole } from "../enums/user.enum.js";
import {
  IEnrollment,
  type EnrollmentInput,
} from "../models/enrollment.model.js";
@Route("enrollments")
@Security("jwt")
@Middlewares(
  requireAuth,
  requireRole(UserRole.ADMIN, UserRole.MODERATOR, UserRole.READER),
)
export class EnrollmentController {
  constructor(private service: EnrollmentService) {}

  @SuccessResponse("201", "Criar matrícula")
  @Post()
  public async create(
    @Body() enrollment: EnrollmentInput,
  ): Promise<IEnrollment | null> {
    return (await this.service.create(enrollment)) as unknown as IEnrollment;
  }

  @SuccessResponse("200", "Cancelar matrícula")
  @Patch()
  public async cancel(
    @Body() enrollmentId: string,
  ): Promise<IEnrollment | null> {
    return (await this.service.cancel(enrollmentId)) as unknown as IEnrollment;
  }
}
