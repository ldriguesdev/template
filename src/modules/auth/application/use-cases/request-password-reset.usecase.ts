import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/domain/repositories/users.repository';
import { HashingService } from '../../domain/services/hashing.service';
import { EmailService } from '../../domain/services/email.service';
import { randomBytes } from 'crypto';
import { PasswordResetRepository } from '../../domain/repository/password-reset.repository';

@Injectable()
export class RequestPasswordResetUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordResetRepository: PasswordResetRepository,
    private readonly hashingService: HashingService,
    private readonly emailService: EmailService,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      const plainToken = randomBytes(32).toString('hex');

      const hashedToken = await this.hashingService.hash(plainToken);
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);

      await this.passwordResetRepository.create({
        user_id: user.id,
        hashed_token: hashedToken,
        expires_at: expiresAt,
      });

      await this.emailService.sendPasswordResetEmail(user.email, plainToken);
    }
  }
}
