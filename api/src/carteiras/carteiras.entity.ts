import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Despesas } from '../despesas/entity/despesas.entity';
import { Receitas } from '../receitas/entity/receitas.entity';
import { Transferencias } from '../transferencias/transferencias.entity';
@Entity()
export class Carteiras {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 255, unique: true, nullable: false })
  descricao: string;

  @OneToMany(() => Despesas, (despesas) => despesas.carteira)
  carteira: Despesas[];

  @OneToMany(() => Receitas, (receitas) => receitas.carteira)
  carteiraReceita: Receitas[];

  @OneToMany(
    () => Transferencias,
    (transferencia) => transferencia.carteiraOrigem,
  )
  transferenciaOrigem: Transferencias[];

  @OneToMany(
    () => Transferencias,
    (transferencia) => transferencia.carteiraDestino,
  )
  transferenciaDestino: Transferencias[];
}
