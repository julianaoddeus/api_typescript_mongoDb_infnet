import { AuthController } from "../controllers/auth.controller.js";
import { CourseController } from "../controllers/course.controller.js";
import { EnrollmentController } from "../controllers/enrollments.controller.js";
import { UserController } from "../controllers/user.controller.js";
import { CourseRepository } from "../repository/course.repository.js";
import { EnrollmentRepository } from "../repository/enrollments.repository.js";
import { UserRepository } from "../repository/user.repository.js";
import { AuthService } from "../services/auth.service.js";
import { CourseService } from "../services/course.service.js";
import { EnrollmentService } from "../services/enrollments.service.js";
import { UserService } from "../services/user.service.js";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);

const enrollmentRepository = new EnrollmentRepository();
const enrollmentService = new EnrollmentService(enrollmentRepository);

const authService = new AuthService(userService);

export const iocContainer = {
  get<T>(controller: new (...args: never[]) => T): T {
    switch (controller as unknown) {
      case UserController:
        return new UserController(userService) as T;
      case CourseController:
        return new CourseController(courseService, enrollmentService) as T;
      case EnrollmentController:
        return new EnrollmentController(enrollmentService) as T;
      case AuthController:
        return new AuthController(authService) as T;
      default:
        return new controller();
    }
  },
};
