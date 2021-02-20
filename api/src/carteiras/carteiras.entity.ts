import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Despesas } from '../despesas/despesas.entity'
@Entity()
export class Carteiras {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  descricao: string;

  @OneToMany(() => Despesas, despesas => despesas.carteira)
  carteira: Despesas[]; 
}