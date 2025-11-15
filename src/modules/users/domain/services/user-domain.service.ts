import { User } from '../entities/user.entity';
import * as crypto from 'crypto';

export class UserDomainService {
  static validateEmail(email: string) {
    if (!email.includes('@')) {
      throw new Error('Email inválido');
    }
  }

  static hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  static createUser(
    name: string,
    email: string,
    password: string,
    role: 'USER' | 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'MANAGER' = 'USER',
  ): User {
    this.validateEmail(email);
    const passwordHash = this.hashPassword(password);

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
