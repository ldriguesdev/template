import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/providers/prisma.service';
import {
  RefreshTokenData,
  RefreshTokenRepository,
} from 'src/modules/auth/domain/repository/refresh-token.repository';

@Injectable()
export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  create({
    expires_at,
    hashed_token,
    userId,
  }: Omit<RefreshTokenData, 'id'>): Promise<RefreshTokenData> {
    return this.prisma.refreshToken.create({
      data: {
        hashed_token,
        expires_at,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findByHashedToken(hashed_token: string): Promise<RefreshTokenData | null> {
    return this.prisma.refreshToken.findUnique({
      where: { hashed_token },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.refreshToken.delete({ where: { id } });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
  }
}
