import { Connection, Repository } from 'typeorm';
import { Transferencias } from './transferencias.entity';

export const transferenciasProviders = [
  {
    provide: 'TRANSFERENCIAS',
    useFactory: (connection: Connection) => connection.getRepository(Transferencias),
    inject: ['DATABASE_CONNECTION'],
  },
];