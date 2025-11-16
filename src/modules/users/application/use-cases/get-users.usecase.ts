import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { UserNotExistsError } from '../errors/user-not-exists.error';
import { UserRole } from '@prisma/client';

export interface GetUsersUseCaseInput {
  name?: string;
  role?: UserRole;
  email?: string;
}

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(input: GetUsersUseCaseInput) {
    const users = await this.usersRepository.findAll({
      name: input.name,
      role: input.role,
      email: input.email,
    });

    if (!users) {
      throw new UserNotExistsError();
    }

    return users;
  }
}
