import type { CourseService } from "../services/course.service.js";
import type { EnrollmentService } from "../services/enrollments.service.js";
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Route,
  Security,
  SuccessResponse,
} from "tsoa";
import { requireAuth } from "../middlewares/require-auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

import type { CourseInput, ICourse } from "../models/courses.model.js";
import { UserRole } from "../enums/user.enum.js";
@Route("courses")
@Security("jwt")
@Middlewares(requireAuth, requireRole(UserRole.ADMIN))
export class CourseController extends Controller {
  constructor(
    private service: CourseService,
    private enrollmentService: EnrollmentService,
  ) {
    super();
  }

  @SuccessResponse("200", "Ok")
  @Get()
  public async getAll() {
    return await this.service.findAll();
  }

  @SuccessResponse("200", "Ok")
  @Get("enrollments/{userId}")
  public async getCourseWithEnrollment(@Path() userId: string) {
    const enrollments = await this.enrollmentService.findByUser(userId);

    const courses = await this.service.findAll();

    const coursesWithEnrollments = enrollments.map((enrollment) => {
      return courses.find((course) => course.id === enrollment.courseId);
    });

    return coursesWithEnrollments;
  }

  @SuccessResponse("200", "Ok")
  @Get("{courseId}")
  public async getOne(@Path() courseId: string) {
    return await this.service.findOne(courseId);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async insert(@Body() course: CourseInput): Promise<ICourse> {
    const newCourse = await this.service.insert(course);
    this.setStatus(201);

    return newCourse as ICourse;
  }

  @SuccessResponse("200", "Ok")
  @Put("{courseId}")
  public async update(
    @Path() courseId: string,
    @Body() data: CourseInput,
  ): Promise<ICourse> {
    return await this.service.update(courseId, data);
  }

  @SuccessResponse("204", "No Content")
  @Delete("{courseId}")
  public async delete(@Path() courseId: string): Promise<void> {
    await this.service.delete(courseId);
  }
}
