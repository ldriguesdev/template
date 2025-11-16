export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public passwordHash: string,
    public role: 'USER' | 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'MANAGER',
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  update(
    data: Partial<{
      name: string;
      email: string;
      passwordHash: string;
      role: 'USER' | 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'MANAGER';
    }>,
  ) {
    if (data.name !== undefined) this.name = data.name;
    if (data.email !== undefined) this.email = data.email;
    if (data.passwordHash !== undefined) this.passwordHash = data.passwordHash;
    if (data.role !== undefined) this.role = data.role;
  }
}
