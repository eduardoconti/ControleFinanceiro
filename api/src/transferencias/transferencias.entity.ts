import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Carteiras } from '../carteiras/carteiras.entity';
@Entity({schema:'public', name:'transferencias'})
export class Transferencias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp without time zone')
  dataTransferencia: Date;

  @Column( 'boolean')
  pago: boolean;

  @Column('float')
  valor: number;

  @ManyToOne(() => Carteiras, (carteiras) => carteiras.transferenciaOrigem)
  carteiraOrigem: number;

  @ManyToOne(() => Carteiras, (carteiras) => carteiras.transferenciaDestino)
  carteiraDestino: number;
}
