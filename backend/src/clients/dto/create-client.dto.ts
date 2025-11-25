import { IsString, IsEmail, IsOptional, IsDateString, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'João da Silva', minLength: 2, maxLength: 100 })
  @IsString()
  @Length(2, 100)
  nome!: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '+55 11 99999-9999' })
  @IsPhoneNumber('BR', { message: 'Telefone inválido. Use um número BR válido.' })
  telefone!: string;
  
  @ApiProperty({ example: 'Senha@123', description: 'Será armazenada com hash' })
  @IsString()
  @Length(6, 100)
  senha!: string;

  @ApiPropertyOptional({ example: '2004-09-25', description: 'ISO 8601 (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString({}, { message: 'Use formato ISO 8601 (YYYY-MM-DD).' })
  dataNascimento?: string;

  @ApiPropertyOptional({ example: 'Prefere corte low fade', maxLength: 200 })
  @IsOptional()
  @IsString()
  @Length(0, 200)
  observacoes?: string;
}
