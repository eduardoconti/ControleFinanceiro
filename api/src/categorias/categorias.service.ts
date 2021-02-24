import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categorias } from './categorias.entity';
import { CategoriasDTO } from './categorias.dto'

@Injectable()
export class CategoriasService {

    constructor(
        @Inject('CATEGORIAS')
        private categoriaRepository: Repository<Categorias>,
      ) { }
      
      async getOne(id: number): Promise<Categorias> {
        return this.categoriaRepository.findOneOrFail({ id });
      }

      async retornaTodasCategorias(): Promise<Categorias[]> {
        return await this.categoriaRepository.find();
      }

      async insereCategoria(categoria: CategoriasDTO): Promise<Categorias> {
        const newDespesas = this.categoriaRepository.create(categoria);
        await this.categoriaRepository.save(newDespesas);
        return newDespesas;
      }

      async deletaCategoria(id: number): Promise<{ deleted: boolean; message?: string }> {
        try {
          await this.categoriaRepository.delete({ id });
          return { deleted: true };
        } catch (err) {
          return { deleted: false, message: err.message };
        }
      }

      async alteraCategoria(categoria: CategoriasDTO): Promise<Categorias> {
        const { id } = categoria;
        await this.categoriaRepository.update({ id }, categoria);
        return this.getOne(id);
      }
}
