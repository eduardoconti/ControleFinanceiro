import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Carteiras } from '../carteiras/carteiras.entity'
@Entity()
export class Transferencias {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Carteiras, carteiras => carteiras.transferenciaOrigem)
  carteiraOrigem: Carteiras;

  @ManyToOne(() => Carteiras, carteiras => carteiras.transferenciaDestino)
  carteiraDestino: Carteiras;

  @Column()
  dataTransferencia:Date;

  @Column()
  pago:boolean;

  @Column({type:'decimal', scale:2, precision:10}) 
  valor: number;

}