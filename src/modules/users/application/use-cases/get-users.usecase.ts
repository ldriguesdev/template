import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { UserNotExistsError } from '../errors/user-not-exists.error';

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute() {
    const users = await this.usersRepository.findAll();

    if (!users) {
      throw new UserNotExistsError();
    }

    return users;
  }
}
