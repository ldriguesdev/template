import { Global, Module } from '@nestjs/common';
import { PrismaService } from './providers/prisma.service';
import { ConfigModule } from './config/config.module';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [PrismaService, ConfigModule],
  exports: [PrismaService, ConfigModule],
})
export class CoreModule {}
