import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CarteirasDTO {
    id?: number;
    
    @IsString()
    @Length(2,20)
    @ApiProperty()
    descricao: string;
  }