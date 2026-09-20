import {
  EnrollmentInput,
  EnrollmentModel,
  type IEnrollment,
} from "../models/enrollment.model.js";

export class EnrollmentRepository {
  public async findAll(): Promise<IEnrollment[]> {
    return await EnrollmentModel.find();
  }

  public async findOne(enrollmentId: string): Promise<IEnrollment | null> {
    return await EnrollmentModel.findById(enrollmentId);
  }

  public async findByUser(userId: string): Promise<IEnrollment[]> {
    const enrollments = await this.findAll();

    return enrollments.filter((e: IEnrollment) => e.userId === userId);
  }

  public async input(enrollment: EnrollmentInput) {
    return await EnrollmentModel.create(enrollment);
  }

  public async update(enrollmentId: string, data: EnrollmentInput) {
    return await EnrollmentModel.findByIdAndUpdate(enrollmentId, data, {
      new: true,
    });
  }

  public async cancel(enrollmentId: string, data: Partial<EnrollmentInput>) {
    return await EnrollmentModel.findByIdAndUpdate(enrollmentId, data, {
      new: true,
    });
  }
}
