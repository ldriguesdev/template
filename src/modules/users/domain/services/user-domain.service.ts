import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export class UserDomainService {
  static validateEmail(email: string) {
    if (!email.includes('@')) {
      throw new Error('Email inválido');
    }
  }

  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async createUser(
    name: string,
    email: string,
    password: string,
    role: 'USER' | 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'MANAGER' = 'USER',
  ): Promise<User> {
    this.validateEmail(email);

    const passwordHash = await this.hashPassword(password);

    return new User(
      crypto.randomUUID(),
      name,
      email,
      passwordHash,
      role,
      new Date(),
      new Date(),
    );
  }
}
