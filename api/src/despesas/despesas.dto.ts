import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsPositive, IsString, Length } from "class-validator";

export class DespesasDTO {
    id?: number;
    @IsString()
    @Length(2, 20)
    descricao: string;
    @IsNumber()
    @IsNotEmpty()
    categoriaId: number;
    @IsPositive()
    @IsNotEmpty()
    valor: number;
    @IsDate()
    vencimento: Date;
    @IsDate()
    pagamento?: Date;
    @IsBoolean()
    @IsNotEmpty()
    pago: boolean;
    @IsNumber()
    @IsNotEmpty()
    carteiraId: number;
  }