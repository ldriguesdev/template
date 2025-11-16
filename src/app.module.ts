import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { UsersModule } from './modules/users/users.module';
import { DoctorsModule } from './modules/doctors/doctors.module';

@Module({
  imports: [CoreModule, UsersModule, DoctorsModule],
})
export class AppModule {}
