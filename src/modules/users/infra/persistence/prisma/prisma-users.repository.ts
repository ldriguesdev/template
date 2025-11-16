import { User } from 'src/modules/users/domain/entities/user.entity';
import {
  UserFilterParams,
  UsersRepository,
} from 'src/modules/users/domain/repositories/users.repository';
import { UserMapper } from '../../mappers/user.mapper';
import { PrismaService } from 'src/core/providers/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password_hash: user.passwordHash,
        role: user.role,
      },
    });

    return UserMapper.toDomain(created);
  }

  async findById(id: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return raw ? UserMapper.toDomain(raw) : null;
  }

  async findAll(params: UserFilterParams): Promise<User[]> {
    const where: Prisma.UserWhereInput = {};

    if (params.name) {
      where.name = {
        contains: params.name,
        mode: 'insensitive',
      };
    }

    if (params.email) {
      where.email = {
        contains: params.email,
        mode: 'insensitive',
      };
    }

    if (params.role) {
      where.role = params.role;
    }

    const raw = await this.prisma.user.findMany({ where });
    return raw.map((data) => UserMapper.toDomain(data));
  }

  async delete(id: string): Promise<User | null> {
    const raw = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return raw ? UserMapper.toDomain(raw) : null;
  }

  async update(user: User): Promise<User> {
    const raw = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
        updated_at: new Date(),
      },
    });

    return UserMapper.toDomain(raw);
  }

  async findByEmail(email: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return raw ? UserMapper.toDomain(raw) : null;
  }
}
