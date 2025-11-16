import { Injectable } from '@nestjs/common';
import { DoctorsRepository } from '../../domain/repository/doctors.repository';
import { DoctorNotFoundError } from '../errors/doctor-not-found.error';

@Injectable()
export class GetDoctorsUseCase {
  constructor(private readonly doctorsRepository: DoctorsRepository) {}

  async execute() {
    const doctor = await this.doctorsRepository.findAll();

    if (!doctor) {
      throw new DoctorNotFoundError();
    }

    return doctor;
  }
}
