import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Carteiras } from '../carteiras/carteiras.entity';
@Entity()
export class Transferencias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataTransferencia: Date;

  @Column({ type: 'boolean', default: false })
  pago: boolean;

  @Column({ type: 'float', scale: 2, precision: 10 })
  valor: number;

  @ManyToOne(() => Carteiras, (carteiras) => carteiras.transferenciaOrigem)
  carteiraOrigem: number;

  @ManyToOne(() => Carteiras, (carteiras) => carteiras.transferenciaDestino)
  carteiraDestino: number;
}
