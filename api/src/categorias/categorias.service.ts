import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categorias } from './categorias.entity';
import { CategoriasDTO } from './categorias.dto'
import { from } from 'rxjs';

@Injectable()
export class CategoriasService {

    constructor(
        @Inject('CATEGORIAS')
        private receitaRepository: Repository<Categorias>,
      ) { }
    
      async retornaTodasCategorias(): Promise<Categorias[]> {
        return await this.receitaRepository.find();
      }
}
