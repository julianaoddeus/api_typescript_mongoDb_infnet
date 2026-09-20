import type {
  EnrollmentInput,
  IEnrollment,
} from "../models/enrollment.model.js";
import type { EnrollmentRepository } from "../repository/enrollments.repository.js";
import { EnrollmentEnum } from "../enums/enrollment.enum.js";

export class EnrollmentService {
  constructor(private repository: EnrollmentRepository) {}

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(enrollmentId: string) {
    const enrollment = await this.repository.findOne(enrollmentId);

    if (!enrollment)
      throw { status: 404, message: "Matrícula não encontrada." };

    return enrollment;
  }

  async findByUser(userId: string) {
    const userEnrollment = await this.repository.findByUser(userId);

    if (!userEnrollment)
      throw { status: 404, message: "Aluno não matrículado." };

    return userEnrollment;
  }

  async create(enrollment: EnrollmentInput) {
    return await this.repository.input(enrollment);
  }
  
  async cancel(enrollmentId: string) {
    const enrollment = await this.repository.findOne(enrollmentId);

    if (!enrollment)
      throw { status: 404, message: "Matrícula não encontrada." };

    if (enrollment.canceledAt) {
      throw {
        status: 409,
        message: "Matrícula já está cancelada.",
      };
    }

    const cancelInfo = {
      status: EnrollmentEnum.CANCELED,
      canceledAt: new Date(),
    };

    return await this.repository.update(
      enrollmentId,
      cancelInfo as unknown as EnrollmentInput,
    );
  }
}
