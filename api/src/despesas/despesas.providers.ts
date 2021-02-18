import { Connection, Repository } from 'typeorm';
import { Despesas } from './despesas.entity';

export const despesasProviders = [
  {
    provide: 'DESPESAS',
    useFactory: (connection: Connection) => connection.getRepository(Despesas),
    inject: ['DATABASE_CONNECTION'],
  },
];