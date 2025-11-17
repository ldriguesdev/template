import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { EmailAlreadyExistsError } from '../errors/email-already-exists.error';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(dto: CreateUserDTO) {
    const userAlreadyExist = await this.usersRepository.findByEmail(dto.email);

    if (userAlreadyExist) {
      throw new EmailAlreadyExistsError();
    }

    const user = await UserDomainService.createUser(
      dto.name,
      dto.email,
      dto.password,
      dto.role ?? 'USER',
    );

    return this.usersRepository.create(user);
  }
}
