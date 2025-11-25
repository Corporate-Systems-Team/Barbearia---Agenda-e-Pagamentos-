export enum PaymentStatus {
  PENDENTE = 'pendente',   // criado, aguardando confirmação
  PAGO = 'pago',           // confirmado/compensado
  CANCELADO = 'cancelado', // cancelado antes de pagar
  ESTORNADO = 'estornado', // pago e depois estornado (se aplicável)
}