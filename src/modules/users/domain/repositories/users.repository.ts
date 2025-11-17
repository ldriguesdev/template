import { User } from '../entities/user.entity';
import { UserRole } from '@prisma/client';

export interface UserFilterParams {
  name?: string;
  role?: UserRole;
  email?: string;
}

export abstract class UsersRepository {
  abstract create(user: User): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(params: UserFilterParams): Promise<User[]>;
  abstract delete(id: string): Promise<User | null>;
  abstract update(user: User): Promise<User>;
}
