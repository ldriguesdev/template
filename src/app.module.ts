import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { UsersModule } from './modules/users/users.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CoreModule, AuthModule, UsersModule, DoctorsModule],
})
export class AppModule {}
