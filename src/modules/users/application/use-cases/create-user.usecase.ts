import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserDomainService } from '../../domain/services/user-domain.service';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(dto: CreateUserDTO) {
    const user = UserDomainService.createUser(
      dto.name,
      dto.email,
      dto.password,
      dto.role ?? 'USER',
    );

    return this.usersRepository.create(user);
  }
}
