import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../domain/repositories/users.repository';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
