import { Exclude } from 'class-transformer';
import { Despesas } from 'src/despesas/entity/despesas.entity';
import { Receitas } from 'src/receitas/entity/receitas.entity';
import { Transferencias } from 'src/transferencias/entity/transferencias.entity';
import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'users' })
export class Users {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  @Exclude()
  password: string;

  @Column('text')
  login: string;

  @Column('text')
  nome: string;

  @Column('integer')
  status: number;

  @Column('integer')
  perfil: number;

  @OneToMany(() => Despesas, (despesas) => despesas.user)
  userDespesa: Despesas[];

  @OneToMany(() => Receitas, (receitas) => receitas.user)
  userReceita: Receitas[];

  @OneToMany(() => Transferencias, (transferencias) => transferencias.user)
  userTransferencia: Transferencias[];
}
