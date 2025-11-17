import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/domain/repositories/users.repository';
import { HashingService } from '../../domain/services/hashing.service';
import { PasswordResetRepository } from '../../domain/repository/password-reset.repository';
import { UserNotExistsError } from 'src/modules/users/application/errors/user-not-exists.error';
import { TokenExpiredError } from '@nestjs/jwt';
import { TokenInvalidExceptionError } from '../errors/token-invalid-exception.error';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordResetRepository: PasswordResetRepository,
    private readonly hashingService: HashingService,
  ) {}

  async execute(plainToken: string, newPassword: string): Promise<void> {
    const hashedToken = await this.hashingService.hash(plainToken);
    const tokenFromDb =
      await this.passwordResetRepository.findByHashedToken(hashedToken);

    if (!tokenFromDb || tokenFromDb.expires_at < new Date()) {
      throw new TokenInvalidExceptionError();
    }

    const newPasswordHash = await this.hashingService.hash(newPassword);

    const user = await this.usersRepository.findById(tokenFromDb.user_id);

    if (!user) {
      throw new UserNotExistsError();
    }

    user.update({ passwordHash: newPasswordHash });

    await this.usersRepository.update(user);

    await this.passwordResetRepository.delete(tokenFromDb.id);
  }
}
