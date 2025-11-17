import { Module } from '@nestjs/common';
import { CreateDoctorUseCase } from './application/use-cases/create-doctor.usecase';
import { PrismaDoctorsRepository } from './infra/persistence/prisma/prisma-doctors.repository';
import { DoctorsRepository } from './domain/repository/doctors.repository';
import { CreateUserUseCase } from '../users/application/use-cases/create-user.usecase';
import { PrismaUsersRepository } from '../users/infra/persistence/prisma/prisma-users.repository';
import { UsersRepository } from '../users/domain/repositories/users.repository';
import { DoctorController } from './infra/http/controllers/doctor.controller';
import { GetDoctorUseCase } from './application/use-cases/get-doctor.usecase';
import { GetDoctorsUseCase } from './application/use-cases/get-doctors.usecase';
import { UpdateDoctorUseCase } from './application/use-cases/update-doctor.usecase';
import { DeleteDoctorUseCase } from './application/use-cases/delete-doctor.usecase';

@Module({
  providers: [
    CreateUserUseCase,
    CreateDoctorUseCase,
    GetDoctorUseCase,
    GetDoctorsUseCase,
    UpdateDoctorUseCase,
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
    UpdateDoctorUseCase,
    CreateUserUseCase,
    CreateDoctorUseCase,
    PrismaUsersRepository,
    PrismaDoctorsRepository,
    GetDoctorUseCase,
    GetDoctorsUseCase,
    DeleteDoctorUseCase,
  ],
  controllers: [DoctorController],
})
export class DoctorsModule {}
