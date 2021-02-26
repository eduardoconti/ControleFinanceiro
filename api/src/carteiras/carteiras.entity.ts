import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Despesas } from '../despesas/despesas.entity'
import { Receitas } from '../receitas/receitas.entity'
@Entity()
export class Carteiras {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique:true }) 
  descricao: string;

  @OneToMany(() => Despesas, despesas => despesas.carteira)
  carteira: Despesas[]; 

  @OneToMany(() => Receitas, receitas => receitas.carteira)
  carteiraReceita: Receitas[];  
}