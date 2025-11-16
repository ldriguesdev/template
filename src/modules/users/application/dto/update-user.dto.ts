import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO, UserRoleEnum } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @ApiPropertyOptional({
    example: 'John Updated',
    description: 'Nome atualizado do usuário',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'updated@example.com',
    description: 'E-mail atualizado do usuário',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: '654321',
    minLength: 6,
    description: 'Senha atualizada em texto plano (será criptografada).',
  })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    example: 'MANAGER',
    enum: UserRoleEnum,
    description: 'Tipo de usuário atualizado',
  })
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum;
}
