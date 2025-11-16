import { IsOptional, IsString, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FilterUsersQueryDto {
  @ApiProperty({
    description: 'Filtrar usuários pelo nome (busca parcial).',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Filtrar usuários pelo e-mail (busca parcial).',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    description: 'Filtrar usuários pelo cargo (role).',
    required: false,
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
