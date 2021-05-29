import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsPositive } from "class-validator";

export class TransferenciasDTO {
    id?: number;

    @ApiProperty()
    @IsNumber()
    carteiraOrigemId:number;

    @ApiProperty()
    @IsNumber()
    carteiraDestinoId:number;

    @ApiProperty()
    @IsDate()
    dataTransferencia:Date;

    @ApiProperty()
    @IsBoolean()
    pago:boolean;
    
    @ApiProperty()
    @IsPositive()
    valor:number
  }