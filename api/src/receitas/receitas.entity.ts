import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {Carteiras} from '../carteiras/carteiras.entity'
@Entity()
export class Receitas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  descricao: string; 

  @Column()
  valor: number;

  @Column()
  pagamento:Date

  @Column()
  pago: boolean;

  @ManyToOne(() => Carteiras, carteiras => carteiras.descricao )
  carteira: Carteiras;

}