import { Injectable } from '@nestjs/common';
import { DoctorsRepository } from '../../domain/repository/doctors.repository';
import { DoctorNotFoundError } from '../errors/doctor-not-found.error';
import { UpdateDoctorDTO } from '../dto/update-doctor.dto';

@Injectable()
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
