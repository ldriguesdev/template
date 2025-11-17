import { forwardRef, Module } from '@nestjs/common';
import { PrismaUsersRepository } from './infra/persistence/prisma/prisma-users.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UsersRepository } from './domain/repositories/users.repository';
import { UsersController } from './infra/http/controllers/users.controller';
import { GetUserUseCase } from './application/use-cases/get-user.usecase';
import { GetUsersUseCase } from './application/use-cases/get-users.usecase';
import { DeleteUserUseCase } from './application/use-cases/delete-user.usecase';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';
import { PrismaDoctorsRepository } from '../doctors/infra/persistence/prisma/prisma-doctors.repository';
import { DeleteDoctorUseCase } from '../doctors/application/use-cases/delete-doctor.usecase';
import { DoctorsRepository } from '../doctors/domain/repository/doctors.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    GetUsersUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    DeleteDoctorUseCase,
    PrismaUsersRepository,
    PrismaDoctorsRepository,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: DoctorsRepository,
      useClass: PrismaDoctorsRepository,
    },
  ],
  exports: [
    CreateUserUseCase,
    GetUserUseCase,
    GetUsersUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    DeleteDoctorUseCase,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
