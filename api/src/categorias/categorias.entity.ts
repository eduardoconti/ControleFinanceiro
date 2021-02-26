import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Despesas } from '../despesas/despesas.entity'
@Entity()
export class Categorias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true, type:String })
  descricao: string;

  @OneToMany(() => Despesas, despesas => despesas.categoria)
  categoria: Despesas[];
}