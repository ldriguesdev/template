import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @ApiPropertyOptional({
    example: 'John Updated',
    description: 'Nome atualizado do usuário',
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'updated@example.com',
    description: 'E-mail atualizado do usuário',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'MANAGER',
    enum: ['USER', 'ADMIN', 'DOCTOR', 'PATIENT', 'MANAGER'],
    description: 'Tipo de usuário atualizado',
  })
  role?: 'USER' | 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'MANAGER';
}
