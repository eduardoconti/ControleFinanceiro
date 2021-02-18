export interface DespesasDTO {
    id?: number;
    descricao?: string;
    categoria?: number;
    valor?: number;
    vencimento?:Date;
    pagamento?:Date;
    pago?: boolean;
    tipoPagamento?:number;
  }