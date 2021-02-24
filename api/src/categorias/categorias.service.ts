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

      async deletaCategoria(id: number): Promise<{ deleted: boolean; message?: string }> {
        try {
          await this.receitaRepository.delete({ id });
          return { deleted: true };
        } catch (err) {
          return { deleted: false, message: err.message };
        }
      }
}
