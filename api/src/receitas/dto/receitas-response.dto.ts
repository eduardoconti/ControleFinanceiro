import { Carteiras } from 'src/carteiras/entity/carteiras.entity';
import { Users } from 'src/users/entity/users.entity';

export class ReceitasResponseDTO {
  id: number;
  user: string;
  descricao: string;
  valor: number;
  pagamento: Date;
  pago: boolean;
  carteira: number;
}
