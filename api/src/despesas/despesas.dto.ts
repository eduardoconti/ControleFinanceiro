import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Carteiras } from "src/carteiras/carteiras.entity";
import { Categorias } from "src/categorias/categorias.entity";

export class DespesasDTO {
    id?: number;

    @IsString({message:"o campo descricao deve ser string"})
    @Length(2, 20, {message: "o campo descricao deve ter de 2 a 20 caracteres"})
    @ApiProperty()
    @IsNotEmpty({message:"o campo descricao não pode ser nulo"})
    descricao: string;

    @IsNumber()
    @ApiProperty({name:'categoria'})
    categoria: Categorias;

    @IsNumber()
    @ApiProperty({name:'carteira'})
    carteira: Carteiras;

    @IsNumber()
    @ApiProperty()
    valor: number;

    @IsDateString()
    @ApiPropertyOptional()
    vencimento: Date;

    @IsDateString()
    @IsOptional()
    @ApiPropertyOptional()
    pagamento?: Date;

    @IsBoolean()
    @ApiPropertyOptional()
    pago: boolean;
    
  }