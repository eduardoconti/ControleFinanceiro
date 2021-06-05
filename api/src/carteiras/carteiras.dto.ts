import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { CONSTRAINTS_MESSAGES } from 'src/shared/constants';

export class CarteirasDTO {
  id?: number;

  @IsString()
  @Length(2, 30, { message: CONSTRAINTS_MESSAGES.IS_LENGTH })
  @ApiProperty()
  descricao: string;
}
