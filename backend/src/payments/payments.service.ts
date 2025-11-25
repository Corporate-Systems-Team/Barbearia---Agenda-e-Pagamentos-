import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { QueryPaymentsDto } from './dto/query-payments.dto';
import { PaymentMethod } from './enums/payment-method.enum';
import { PaymentStatus } from './enums/payment-status.enum';


type Payment = {
  id: string;
  agendamentoId: string;
  valor: number;
  metodo: PaymentMethod;
  status: PaymentStatus;
  descricao?: string;
  criadoEm: string;
  atualizadoEm: string;
};

@Injectable()
export class PaymentsService {
  private data: Payment[] = [];

  async create(dto: CreatePaymentDto) {
    // TODO: validar se agendamento existe e está 'realizado' ou 'agendado' conforme regra
    // TODO: validar se dto.valor == preco do serviço do agendamento
    if (dto.valor < 0) throw new BadRequestException('Valor inválido');

    const now = new Date().toISOString();
    const payment: Payment = {
      id: crypto.randomUUID(),
      agendamentoId: dto.agendamentoId,
      valor: dto.valor,
      metodo: dto.metodo,
      status: dto.status ?? PaymentStatus.PENDENTE,
      descricao: dto.descricao,
      criadoEm: now,
      atualizadoEm: now,
    };
    this.data.push(payment);
    return payment;
  }

  async list(q: QueryPaymentsDto) {
    let r = [...this.data];
    if (q.agendamentoId) r = r.filter(p => p.agendamentoId === q.agendamentoId);
    if (q.metodo) r = r.filter(p => p.metodo === q.metodo);
    if (q.status) r = r.filter(p => p.status === q.status);
    const start = ((q.page ?? 1) - 1) * (q.limit ?? 10);
    return { total: r.length, items: r.slice(start, start + (q.limit ?? 10)) };
    // TODO: ordenar por criadoEm desc
  }

  async getOne(id: string) {
    const p = this.data.find(x => x.id === id);
    if (!p) throw new NotFoundException('Pagamento não encontrado');
    return p;
  }

  async updateStatus(id: string, dto: UpdatePaymentStatusDto) {
    const i = this.data.findIndex(x => x.id === id);
    if (i < 0) throw new NotFoundException('Pagamento não encontrado');

    // Máquina de estados (simplificada)
    const atual = this.data[i].status;
    const proximo = dto.status;

    // Regras:
    // pendente -> pago | cancelado
    // pago     -> estornado (ou manter pago)
    // cancelado/estornado não voltam para pendente/pago
    const permitido =
      (atual === PaymentStatus.PENDENTE && (proximo === PaymentStatus.PAGO || proximo === PaymentStatus.CANCELADO)) ||
      (atual === PaymentStatus.PAGO && (proximo === PaymentStatus.ESTORNADO || proximo === PaymentStatus.PAGO)) ||
      (proximo === atual);

    if (!permitido) {
      throw new BadRequestException(`Transição de '${atual}' para '${proximo}' não permitida`);
    }

    const updated = {
      ...this.data[i],
      status: proximo,
      atualizadoEm: new Date().toISOString(),
    };
    this.data[i] = updated;
    return updated;
  }
}

