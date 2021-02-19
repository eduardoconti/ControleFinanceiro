import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import {Categorias} from '../categorias/categorias.entity'
@Entity()
export class Despesas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  descricao: string;

  @Column()
  categoria: number;

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