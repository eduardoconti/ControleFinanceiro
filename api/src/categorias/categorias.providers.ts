import { Connection, Repository } from 'typeorm';
import { Categorias } from './categorias.entity';

export const categoriasProviders = [
  {
    provide: 'CATEGORIAS',
    useFactory: (connection: Connection) => connection.getRepository(Categorias),
    inject: ['DATABASE_CONNECTION'],
  },

];