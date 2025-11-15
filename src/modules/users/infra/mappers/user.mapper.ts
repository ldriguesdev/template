import { User } from '../../domain/entities/user.entity';
import { User as PrismaUser } from '@prisma/client';

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return new User(
      raw.id,
      raw.name,
      raw.email,
      raw.password_hash,
      raw.role,
      raw.created_at,
      raw.updated_at,
    );
  }
}
