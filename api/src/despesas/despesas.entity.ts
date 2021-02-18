import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  tipoPagamento: number;

}