export interface ReceitasDTO {
    id?: number;
    descricao?: string;
    valor?: number;
    pagamento?:Date;
    pago?: boolean;
    carteira?:number;
  }