import { Carteiras } from "src/carteiras/entity/carteiras.entity";
import { Categorias } from "src/categorias/entity/categorias.entity";
import { Users } from "src/users/entity/users.entity";

export class DespesasResponseDTO {
  id: number;
  user: string|Users;
  descricao: string;
  categoria: number|Categorias;
  carteira: number|Carteiras;
  valor: number;
  vencimento: Date;
  pagamento: Date;
  pago: boolean;
}
