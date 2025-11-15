import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../domain/repositories/users.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.delete(id);

    return user;
  }
}
