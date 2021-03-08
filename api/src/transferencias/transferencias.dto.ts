export interface TransferenciasDTO {
    id?: number;
    carteiraOrigemId:number;
    carteiraDestinoId:number;
    dataTransferencia:Date;
    pago:boolean;
    valor:number
  }