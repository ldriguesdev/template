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

  updateEmail(newEmail: string) {
    this.email = newEmail;
  }

  updatePasswordHash(newHash: string) {
    this.passwordHash = newHash;
  }

  updateName(name: string) {
    this.name = name;
  }

  changeRole(role: 'USER' | 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'MANAGER') {
    this.role = role;
  }
}
