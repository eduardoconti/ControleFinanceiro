import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Categorias } from '../../categorias/entity/categorias.entity';
import { Carteiras } from '../../carteiras/entity/carteiras.entity';
import { Users } from 'src/users/entity/users.entity';

@Entity({ schema: 'public', name: 'despesas' })
export class Despesas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  descricao: string;

  @Column('float', { default: 0 })
  valor: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  vencimento: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  pagamento: Date;

  @Column('boolean', { default: false })
  pago: boolean;

  @ManyToOne(() => Carteiras, (carteiras) => carteiras.id, { nullable: false })
  carteira: number;

  @ManyToOne(() => Categorias, (categorias) => categorias.id, {
    nullable: false,
  })
  categoria: number;

  @ManyToOne(() => Users, (users) => users.id, { nullable: false })
  user: string;
}
