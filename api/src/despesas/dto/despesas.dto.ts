import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { CONSTRAINTS_MESSAGES } from 'src/shared/constants';

export class DespesasDTO {
  id?: number;

  userId: string;

  @ApiProperty({
    description: 'Descrição da despesa',
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: CONSTRAINTS_MESSAGES.IS_STRING })
  @Length(2, 50, { message: CONSTRAINTS_MESSAGES.IS_LENGTH })
  @IsNotEmpty({ message: CONSTRAINTS_MESSAGES.IS_NOT_EMPTY })
  descricao: string;

  @ApiProperty({ description: 'Id da categoria' })
  @IsNotEmpty({ message: CONSTRAINTS_MESSAGES.IS_NOT_EMPTY })
  //@IsNumber({}, { message: CONSTRAINTS_MESSAGES.IS_NUMBER })
  categoria: number;

  @ApiProperty({ description: 'Id da carteira' })
  @IsNotEmpty({ message: CONSTRAINTS_MESSAGES.IS_NOT_EMPTY })
  //@IsNumber({}, { message: CONSTRAINTS_MESSAGES.IS_NUMBER })
  carteira: number;

  @ApiProperty({ description: 'Valor da despesa', default: 0 })
  @IsNumber({}, { message: CONSTRAINTS_MESSAGES.IS_NUMBER })
  @IsNotEmpty({ message: CONSTRAINTS_MESSAGES.IS_NOT_EMPTY })
  valor: number;

  @ApiPropertyOptional({
    description: 'Data de vencimento',
    default: new Date(),
  })
  @IsDateString(null, { message: CONSTRAINTS_MESSAGES.IS_DATE })
  @IsOptional()
  vencimento: Date;

  @ApiPropertyOptional({
    description: 'Data de pagamento',
    default: new Date(),
  })
  @IsDateString(null, { message: CONSTRAINTS_MESSAGES.IS_DATE })
  @IsOptional()
  pagamento?: Date;

  @ApiPropertyOptional({ description: 'Flag Pago', default: false })
  @IsBoolean({ message: CONSTRAINTS_MESSAGES.IS_BOOLEAN })
  pago: boolean;
}
