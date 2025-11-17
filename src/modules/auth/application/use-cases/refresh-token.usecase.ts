import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/domain/repositories/users.repository';
import { HashingService } from '../../domain/services/hashing.service';
import { TokenService, JwtPayload } from '../../domain/services/token.service';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenRepository } from '../../domain/repository/refresh-token.repository';
import { UnauthorizedExceptionError } from '../errors/unauthorized-exception.error';
import { TokenInvalidExceptionError } from '../errors/token-invalid-exception.error';
import { UserNotExistsError } from 'src/modules/users/application/errors/user-not-exists.error';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(originalRefreshToken: string) {
    let payload: JwtPayload;
    try {
      payload =
        await this.tokenService.verifyRefreshToken(originalRefreshToken);
    } catch (error) {
      throw new UnauthorizedExceptionError();
    }

    const hashedToken = await this.hashingService.hash(originalRefreshToken);
    const tokenFromDb =
      await this.refreshTokenRepository.findByHashedToken(hashedToken);

    if (!tokenFromDb) {
      throw new TokenInvalidExceptionError();
    }

    await this.refreshTokenRepository.delete(tokenFromDb.id);

    const user = await this.usersRepository.findById(payload.sub);
    if (!user) {
      throw new UserNotExistsError();
    }

    const newPayload = { email: user.email, sub: user.id };
    const [newAccessToken, newRefreshToken] = await Promise.all([
      this.tokenService.signAccessToken(newPayload),
      this.tokenService.signRefreshToken(newPayload),
    ]);

    const newHashedRefreshToken =
      await this.hashingService.hash(newRefreshToken);
    const expiresDays = parseInt(
      this.configService.get('JWT_REFRESH_EXPIRES_IN').slice(0, -1),
    );
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresDays);

    await this.refreshTokenRepository.create({
      userId: user.id,
      hashed_token: newHashedRefreshToken,
      expires_at: expiresAt,
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
