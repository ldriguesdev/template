import { Doctor as PrismaDoctor, User as PrismaUser } from '@prisma/client';
import { Doctor } from '../../domain/entities/doctor.entity';

type PrismaDoctorWithUser = PrismaDoctor & {
  user: PrismaUser;
};

export class DoctorMapper {
  static toDomain(raw: PrismaDoctorWithUser): Doctor {
    return new Doctor({
      id: raw.id,
      userId: raw.user_id,
      crm: raw.crm,
      bio: raw.bio,
      city: raw.city,
      state: raw.state,
      phone: raw.phone,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      name: raw.user.name,
      email: raw.user.email,
    });
  }
}
