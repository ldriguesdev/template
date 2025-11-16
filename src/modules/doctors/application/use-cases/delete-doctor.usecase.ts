import { Injectable } from '@nestjs/common';
import { DoctorsRepository } from '../../domain/repository/doctors.repository';
import { DoctorNotFoundError } from '../errors/doctor-not-found.error';

@Injectable()
export class DeleteDoctorUseCase {
  constructor(private readonly doctorsRepository: DoctorsRepository) {}

  async execute(id: string) {
    const doctor = await this.doctorsRepository.findById(id);

    if (!doctor) {
      throw new DoctorNotFoundError();
    }

    return doctor;
  }
}
