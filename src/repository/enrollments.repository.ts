import {
  EnrollmentInput,
  EnrollmentModel,
  type IEnrollment,
} from "../models/enrollment.model.js";

export class EnrollmentRepository {
  public async findByUser(userId: string): Promise<IEnrollment[]> {
    return await EnrollmentModel.find({ userId });
  }

  public async insert(enrollment: EnrollmentInput) {
    const newEnrollment = new EnrollmentModel(enrollment);
     newEnrollment.save();
  }

  public async cancel(enrollmentId: string, data: Partial<EnrollmentInput>) {
    return await EnrollmentModel.findByIdAndUpdate(enrollmentId, data, {
      new: true,
    });
  }
}
