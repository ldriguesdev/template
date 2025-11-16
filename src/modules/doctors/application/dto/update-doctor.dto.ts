import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateDoctorDTO {
  @ApiProperty({
    example: 'Dr. João Silva',
    description: 'Nome completo do médico',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'E-mail do médico (único no sistema)',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'Senha de acesso (mínimo 6 caracteres)',
  })
  @IsOptional()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: '123456',
    description: 'Número do CRM do médico',
  })
  @IsOptional()
  @IsString()
  crm: string;

  @ApiPropertyOptional({
    example: 'Especialista em cardiologia com 10 anos de experiência.',
    description: 'Biografia ou descrição profissional do médico',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    example: 'São Paulo',
    description: 'Cidade onde o médico atende',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    example: 'SP',
    description: 'Estado onde o médico atende',
  })
  @IsOptional()
  @IsString()
  state: string;

  @ApiPropertyOptional({
    example: '+55 11 99999-8888',
    description: 'Telefone para contato',
  })
  @IsOptional()
  @IsString()
  phone?: string;
}
