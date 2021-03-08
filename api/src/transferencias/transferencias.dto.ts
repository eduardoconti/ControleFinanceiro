export interface TransferenciasDTO {
    id?: number;
    descricao?: string;
    carteiraOrigemId:number;
    carteiraDestinoId:number;
    dataTransferencia:Date;
    pago:boolean;
    valor:number
  }