import { Type } from 'class-transformer';
import { IsBooleanString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryClientsDto {
  @IsOptional()
  @IsString()
  busca?: string; // nome/email/telefone

  @IsOptional()
  @IsBooleanString()
  ativo?: string; // "true" | "false"

  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  page?: number = 1;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  limit?: number = 10;
}
