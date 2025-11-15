import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../domain/repositories/users.repository';

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute() {
    return await this.usersRepository.findAll();
  }
}
