export interface DespesasDTO {
    id?: number;
    descricao?: string;
    categoriaId?: number;
    valor?: number;
    vencimento?:Date;
    pagamento?:Date;
    pago?: boolean;
    carteiraId?:number;
  }