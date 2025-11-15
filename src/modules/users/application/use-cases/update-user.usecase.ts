import { NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../domain/repositories/users.repository';

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
      throw new NotFoundException();
    }

    if (data.name) user.updateName(data.name);
    if (data.email) user.updateEmail(data.email);
    if (data.role) user.changeRole(data.role);

    return this.usersRepository.update(user);
  }
}
