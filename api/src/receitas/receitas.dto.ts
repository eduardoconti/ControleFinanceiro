import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, Length } from "class-validator";
import { Carteiras } from "src/carteiras/carteiras.entity";

export class ReceitasDTO {
   
    id?: number;

    @IsString()
    @Length(2, 20)
    @IsNotEmpty()
    @ApiProperty()
    descricao: string;

    @IsNotEmpty()
    @ApiProperty()
    valor: number;

    @IsDateString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    pagamento:Date;

    @IsBoolean()
    @IsNotEmpty()
    @ApiPropertyOptional()
    pago: boolean;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    carteira: Carteiras;
  }