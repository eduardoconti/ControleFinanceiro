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

export class ReceitasDTO {
  id?: number;

  @ApiProperty()
  @IsNotEmpty({ message: CONSTRAINTS_MESSAGES.IS_NOT_EMPTY })
  @IsString({ message: CONSTRAINTS_MESSAGES.IS_STRING })
  @Length(2, 50, { message: CONSTRAINTS_MESSAGES.IS_LENGTH })
  descricao: string;

  @ApiProperty()
  @IsNotEmpty({ message: CONSTRAINTS_MESSAGES.IS_NOT_EMPTY })
  valor: number;

  @ApiPropertyOptional()
  @IsDateString({}, { message: CONSTRAINTS_MESSAGES.IS_DATE })
  @IsOptional()
  pagamento: Date;

  @IsBoolean({ message: CONSTRAINTS_MESSAGES.IS_BOOLEAN })
  @IsOptional()
  @ApiPropertyOptional()
  pago: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: CONSTRAINTS_MESSAGES.IS_NOT_EMPTY })
  @IsNumber({}, { message: CONSTRAINTS_MESSAGES.IS_NUMBER })
  carteira: number;
}
