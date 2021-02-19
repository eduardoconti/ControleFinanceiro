import { Connection } from 'typeorm';
import { Receitas } from './receitas.entity';

export const ReceitasProviders = [
  {
    provide: 'RECEITAS',
    useFactory: (connection: Connection) => connection.getRepository(Receitas),
    inject: ['DATABASE_CONNECTION'],
  },
];