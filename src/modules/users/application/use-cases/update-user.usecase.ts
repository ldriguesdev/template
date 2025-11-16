import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { UserNotExistsError } from '../errors/user-not-exists.error';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    id: string,
    data: Partial<{
      name: string;
      email: string;
      role: 'USER' | 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'MANAGER';
    }>,
  ) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotExistsError();
    }

    user.update(data);

    const updated = this.usersRepository.update(user);

    return updated;
  }
}
