import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import {Categorias} from '../categorias/categorias.entity'
import {Carteiras} from '../carteiras/carteiras.entity'

@Entity() 
export class Despesas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  descricao: string;

  @ManyToOne(() => Categorias, categorias => categorias.descricao )
  categoria: Categorias;

  @Column({type:'decimal', scale:2, precision:10}) 
  valor: number;

  @Column()
  vencimento:Date;

  @Column()
  pagamento:Date

  @Column()
  pago: boolean;

  @ManyToOne(() => Carteiras, carteiras => carteiras.descricao )
  carteira: Carteiras;

}