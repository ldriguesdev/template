import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { UserNotExistsError } from '../errors/user-not-exists.error';
import { DoctorsRepository } from 'src/modules/doctors/domain/repository/doctors.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly doctorsRepository: DoctorsRepository,
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotExistsError();
    }

    const doctor = await this.doctorsRepository.findByUserId(user.id);

    if (doctor) {
      await this.doctorsRepository.delete(doctor.id);
    }

    await this.usersRepository.delete(user.id);

    return user;
  }
}
