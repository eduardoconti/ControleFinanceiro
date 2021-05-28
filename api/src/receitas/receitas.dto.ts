import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsPositive, IsString, Length } from "class-validator";

export class ReceitasDTO {
   
    id?: number;
    @IsString()
    @Length(2, 20)
    descricao: string;
    @IsPositive()
    @IsNotEmpty()
    valor: number;
    @IsDate()
    @IsNotEmpty()
    pagamento:Date;
    @IsBoolean()
    @IsNotEmpty()
    pago: boolean;
    @IsNumber()
    @IsNotEmpty()
    carteiraId: number;
  }