import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/providers/prisma.service';
import {
  PasswordResetData,
  PasswordResetRepository,
} from 'src/modules/auth/domain/repository/password-reset.repository';

@Injectable()
export class PrismaPasswordResetRepository implements PasswordResetRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Omit<PasswordResetData, 'id'>): Promise<PasswordResetData> {
    return this.prisma.passwordReset.create({ data });
  }

  findByHashedToken(hashed_token: string): Promise<PasswordResetData | null> {
    return this.prisma.passwordReset.findUnique({
      where: { hashed_token },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.passwordReset.delete({ where: { id } });
  }
}
