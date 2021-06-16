import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Despesas } from '../despesas/entity/despesas.entity';
@Entity( {schema:'public', name:'categorias'})
export class Categorias {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  descricao: string;

  @OneToMany(() => Despesas, (despesas) => despesas.categoria)
  categoria: Despesas[];
}
