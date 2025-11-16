import { Doctor } from '../entities/doctor.entity';

interface CreateDoctorProps {
  userId: string;
  crm: string;
  bio?: string | null;
  city?: string | null;
  state: string;
  phone?: string | null;
}

export class DoctorDomainService {
  static createDoctor(props: CreateDoctorProps): Doctor {
    return new Doctor({
      userId: props.userId,
      crm: props.crm,
      bio: props.bio ?? null,
      city: props.city ?? null,
      state: props.state,
      phone: props.phone ?? null,
    });
  }
}
