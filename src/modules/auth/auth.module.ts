import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/modules/users/users.module';
import { HashingService } from './domain/services/hashing.service';
import { TokenService } from './domain/services/token.service';
import { EmailService } from './domain/services/email.service';
import { BcryptHashingService } from './infra/services/bcrypt-hashing.service';
import { JwtTokenService } from './infra/services/jwt-token.service';
import { MailerEmailService } from './infra/services/mailer-email.service';
import { JwtStrategy } from './infra/http/strategies/jwt.strategy';
import { JwtRefreshStrategy } from './infra/http/strategies/jwt-refresh.strategy';
import { AuthController } from './infra/http/controllers/auth.controller';
import { SignInUseCase } from './application/use-cases/sign-in.usecase';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.usecase';
import { RequestPasswordResetUseCase } from './application/use-cases/request-password-reset.usecase';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.usecase';
import { RefreshTokenRepository } from './domain/repository/refresh-token.repository';
import { PrismaRefreshTokenRepository } from './infra/persistence/prisma/prisma-refresh-token.repository';
import { PasswordResetRepository } from './domain/repository/password-reset.repository';
import { PrismaPasswordResetRepository } from './infra/persistence/prisma/prisma-password-reset.repository';
import { UsersRepository } from '../users/domain/repositories/users.repository';
import { PrismaUsersRepository } from '../users/infra/persistence/prisma/prisma-users.repository';

@Module({
  imports: [UsersModule, PassportModule, ConfigModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    SignInUseCase,
    RefreshTokenUseCase,
    RequestPasswordResetUseCase,
    ResetPasswordUseCase,
    JwtStrategy,
    JwtRefreshStrategy,
    { provide: HashingService, useClass: BcryptHashingService },
    { provide: TokenService, useClass: JwtTokenService },
    { provide: EmailService, useClass: MailerEmailService },
    { provide: RefreshTokenRepository, useClass: PrismaRefreshTokenRepository },
    {
      provide: PasswordResetRepository,
      useClass: PrismaPasswordResetRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [HashingService, UsersRepository],
})
export class AuthModule {}
