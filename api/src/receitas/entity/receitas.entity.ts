import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Carteiras } from '../../carteiras/carteiras.entity';
@Entity()
export class Receitas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  descricao: string;

  @Column({ type: 'float', scale: 2, precision: 10, default: 0 })
  valor: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  pagamento: Date;

  @Column({ type: 'boolean', default: false })
  pago: boolean;

  @ManyToOne(() => Carteiras, (carteiras) => carteiras.id)
  carteira: number;
}
