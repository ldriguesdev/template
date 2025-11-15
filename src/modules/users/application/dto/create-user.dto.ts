import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome completo do usuário',
  })
  name!: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'E-mail do usuário. Deve ser único no sistema.',
  })
  email!: string;

  @ApiProperty({
    example: '123456',
    minLength: 6,
    description: 'Senha em texto plano (será criptografada).',
  })
  password!: string;

  @ApiProperty({
    example: 'USER',
    required: false,
    enum: ['USER', 'ADMIN', 'DOCTOR', 'PATIENT', 'MANAGER'],
    description: 'Tipo de usuário. Default: USER',
  })
  role?: 'USER' | 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'MANAGER';
}
