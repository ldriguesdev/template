import { Module } from '@nestjs/common';
import { PrismaUsersRepository } from './infra/persistence/prisma/prisma-users.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UsersRepository } from './domain/repositories/users.repository';
import { UsersController } from './infra/http/controllers/users.controller';
import { GetUserUseCase } from './application/use-cases/get-user.usecase';
import { GetUsersUseCase } from './application/use-cases/get-users.usecase';
import { DeleteUserUseCase } from './application/use-cases/delete-user.usecase';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';

@Module({
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    GetUsersUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    PrismaUsersRepository,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [
    CreateUserUseCase,
    GetUserUseCase,
    GetUsersUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
