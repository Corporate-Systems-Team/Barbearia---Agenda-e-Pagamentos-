import { IsUUID, IsEnum, IsNumber, Min, IsOptional, IsString, Length } from 'class-validator';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

export class CreatePaymentDto {
  @IsUUID('4')
  agendamentoId!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  valor!: number;

  @IsEnum(PaymentMethod)
  metodo!: PaymentMethod;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsOptional()
  @IsString()
  @Length(0, 140)
  descricao?: string;
}