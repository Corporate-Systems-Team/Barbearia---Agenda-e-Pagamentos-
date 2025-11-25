import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { QueryPaymentsDto } from './dto/query-payments.dto';
import { IdParamDto } from './dto/id-param.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post() create(@Body() dto: CreatePaymentDto) { return this.service.create(dto); }

  @Get() list(@Query() q: QueryPaymentsDto) { return this.service.list(q); }

  @Get(':id') getOne(@Param() { id }: IdParamDto) { return this.service.getOne(String(id)); }

  @Patch(':id/status')
  updateStatus(@Param() { id }: IdParamDto, @Body() dto: UpdatePaymentStatusDto) {
    return this.service.updateStatus(String(id), dto);
  }
}
