import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Carteiras } from '../../carteiras/carteiras.entity';
@Entity( {schema:'public', name:'receitas'})
export class Receitas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column('float')
  valor: number;

  @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  pagamento: Date;

  @Column('boolean')
  pago: boolean;

  @ManyToOne(() => Carteiras, (carteiras) => carteiras.id)
  carteira: number;
}
