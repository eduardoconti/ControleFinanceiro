import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import {Categorias} from '../categorias/categorias.entity'
import {Carteiras} from '../carteiras/carteiras.entity'

@Entity() 
export class Despesas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  descricao: string;

  @Column({type:'float', scale:2, precision:10}) 
  valor: number;

  @Column()
  vencimento:Date;

  @Column()
  pagamento:Date

  @Column()
  pago: boolean;

  @ManyToOne(() => Carteiras, carteiras => carteiras.id )
  carteira: Carteiras;

  @ManyToOne(() => Categorias, categorias => categorias.id )
  categoria: Categorias;

}