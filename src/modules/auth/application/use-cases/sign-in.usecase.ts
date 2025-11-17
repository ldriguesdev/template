import { UsersRepository } from 'src/modules/users/domain/repositories/users.repository';
import { HashingService } from '../../domain/services/hashing.service';
import { TokenService } from '../../domain/services/token.service';
import { RefreshTokenRepository } from '../../domain/repository/refresh-token.repository';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedExceptionError } from '../errors/unauthorized-exception.error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(email: string, password: string) {
    console.log(email);

    const user = await this.usersRepository.findByEmail(email);

    console.log(user);

    if (!user) {
      throw new UnauthorizedExceptionError();
    }

    const isPasswordValid = await this.hashingService.compare(
      password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedExceptionError();
    }

    const payload = { email: user.email, sub: user.id };

    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken(payload),
      this.tokenService.signRefreshToken(payload),
    ]);

    const hashedRefreshToken = await this.hashingService.hash(refreshToken);

    const expiresDays = parseInt(
      this.configService.get('JWT_REFRESH_EXPIRES_IN').slice(0, -1),
    );
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresDays);

    await this.refreshTokenRepository.create({
      userId: user.id,
      hashed_token: hashedRefreshToken,
      expires_at: expiresAt,
    });

    return { accessToken, refreshToken };
  }
}
