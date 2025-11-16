import { DoctorsRepository } from '../../domain/repository/doctors.repository';
import { UpdateDoctorDTO } from '../dto/update-doctor.dto';
import { DoctorNotFoundError } from '../errors/doctor-not-found.error';

export class UpdateDoctorUseCase {
  constructor(private readonly doctorsRepository: DoctorsRepository) {}

  async execute(id: string, data: UpdateDoctorDTO) {
    const doctor = await this.doctorsRepository.findById(id);

    if (!doctor) {
      throw new DoctorNotFoundError();
    }

    doctor.update(data);

    const updated = this.doctorsRepository.update(doctor);

    return updated;
  }
}
