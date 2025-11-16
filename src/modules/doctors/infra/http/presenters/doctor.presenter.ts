import { Doctor } from 'src/modules/doctors/domain/entities/doctor.entity';

export class DoctorPresenter {
  static toHTTP(doctor: Doctor) {
    return {
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      crm: doctor.crm,
      bio: doctor.bio,
      city: doctor.city,
      state: doctor.state,
      phone: doctor.phone,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    };
  }
}
