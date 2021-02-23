import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categorias } from './categorias.entity';
import { CategoriasDTO } from './categorias.dto'

@Injectable()
export class CategoriasService {

    constructor(
        @Inject('CATEGORIAS')
        private receitaRepository: Repository<Categorias>,
      ) { }
    
      async retornaTodasCategorias(): Promise<Categorias[]> {
        return await this.receitaRepository.find();
      }

      async insereDespesa(categoria: CategoriasDTO): Promise<Categorias> {
        const newDespesas = this.receitaRepository.create(categoria);
        await this.receitaRepository.save(newDespesas);
        return newDespesas;
      }
}
