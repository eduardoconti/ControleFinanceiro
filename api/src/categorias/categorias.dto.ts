import { IsString, Length } from "class-validator";

export class CategoriasDTO {
    id?: number;
    @IsString()
    @Length(2,20)
    descricao: string;
  }