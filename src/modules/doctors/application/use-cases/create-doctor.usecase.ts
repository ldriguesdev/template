import { Injectable } from '@nestjs/common';
import { DoctorsRepository } from '../../domain/repository/doctors.repository';
import { CreateDoctorDTO } from '../dto/create-doctor.dto';
import { UsersRepository } from 'src/modules/users/domain/repositories/users.repository';
import { UserDomainService } from 'src/modules/users/domain/services/user-domain.service';
import { DoctorDomainService } from '../../domain/services/doctor-domain.service';
import { EmailAlreadyExistsError } from 'src/modules/users/application/errors/email-already-exists.error';
import { DoctorAlreadyExistsError } from '../errors/doctor-already-exists.error';

@Injectable()
export class CreateDoctorUseCase {
  constructor(
    private readonly doctorsRepository: DoctorsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(dto: CreateDoctorDTO) {
    const userAlreadyExist = await this.usersRepository.findByEmail(dto.email);

    if (userAlreadyExist) {
      throw new EmailAlreadyExistsError();
    }

    const user = UserDomainService.createUser(
      dto.name,
      dto.email,
      dto.password,
      'DOCTOR',
    );

    const createdUser = await this.usersRepository.create(user);

    const doctorAlreadyExist = await this.doctorsRepository.findById(
      createdUser.id,
    );

    if (doctorAlreadyExist) {
      throw new DoctorAlreadyExistsError();
    }

    const doctor = DoctorDomainService.createDoctor({
      userId: createdUser.id,
      crm: dto.crm,
      bio: dto.bio,
      city: dto.city,
      state: dto.state,
      phone: dto.phone,
    });

    const createdDoctor = await this.doctorsRepository.create(doctor);

    return createdDoctor;
  }
}
