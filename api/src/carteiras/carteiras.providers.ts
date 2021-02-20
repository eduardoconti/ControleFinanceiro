import { Connection } from 'typeorm';
import { Carteiras } from './carteiras.entity';

export const categoriasProviders = [
  {
    provide: 'CARTEIRAS',
    useFactory: (connection: Connection) => connection.getRepository(Carteiras),
    inject: ['DATABASE_CONNECTION'],
  },

];