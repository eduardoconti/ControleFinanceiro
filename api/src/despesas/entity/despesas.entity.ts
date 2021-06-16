import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Categorias } from '../../categorias/categorias.entity';
import { Carteiras } from '../../carteiras/carteiras.entity';

@Entity({schema:'public', name:'despesas'})
export class Despesas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column('float')
  valor: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  vencimento: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  pagamento: Date;

  @Column('boolean')
  pago: boolean;

  @ManyToOne(() => Carteiras, (carteiras) => carteiras.id)
  carteira: number;

  @ManyToOne(() => Categorias, (categorias) => categorias.id)
  categoria: number;
}
