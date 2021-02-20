import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import {Categorias} from '../categorias/categorias.entity'
@Entity()
export class Despesas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  descricao: string;

  @ManyToOne(() => Categorias, categorias => categorias.descricao )
  categoria: Categorias;

  @Column()
  valor: number;

  @Column()

  vencimento:Date;

  @Column()
  pagamento:Date

  @Column()
  pago: boolean;

  @Column()
  carteira: number;

}