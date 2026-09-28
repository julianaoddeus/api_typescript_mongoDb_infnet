import {
  EnrollmentModel,
  type EnrollmentInput
} from "../models/enrollment.model.js";
import type { EnrollmentRepository } from "../repository/enrollments.repository.js";
import { EnrollmentEnum } from "../enums/enrollment.enum.js";


export class EnrollmentService {
  constructor(private repository: EnrollmentRepository) {}

  async findByUser(userId: string) {
    const userEnrollment = await this.repository.findByUser(userId);

    if (!userEnrollment)
      throw { status: 404, message: "Aluno não matrículado." };

    return userEnrollment;
  }

  async insert(enrollment: EnrollmentInput) {
    return await this.repository.insert({
      ...enrollment,
      status: EnrollmentEnum.ACTIVE,
      enrolledAt: new Date(),
    } as unknown as EnrollmentInput);
  }

  async cancel(enrollmentId: string) {
    const enrollment = await EnrollmentModel.findById(enrollmentId);

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
