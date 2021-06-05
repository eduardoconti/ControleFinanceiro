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

@Entity()
export class Despesas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  descricao: string;

  @Column({ type: 'float', scale: 2, precision: 10, default: 0 })
  valor: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  vencimento: Date;

  @Column({ type: 'timestamp', default: null })
  pagamento: Date;

  @Column({ type: 'boolean', default: false })
  pago: boolean;

  @ManyToOne(() => Carteiras, (carteiras) => carteiras.id)
  carteira: number;

  @ManyToOne(() => Categorias, (categorias) => categorias.id)
  categoria: number;
}
