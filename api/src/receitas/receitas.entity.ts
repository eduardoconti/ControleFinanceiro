import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Receitas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  descricao: string;

  @Column()
  valor: number;

  @Column()
  pagamento:Date

  @Column()
  pago: boolean;

  @Column()
  carteira:number;

}