import { Injectable, Inject, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
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
        return await this.categoriaRepository.find({order:{id:"ASC"}});
      }

      async insereCategoria(categoria: CategoriasDTO): Promise<Categorias> {
        if(categoria.descricao.length < 1 ){
          throw new BadRequestException('Descrição deve ter ao menos 1 caractere')
        }
        const newDespesas = this.categoriaRepository.create(categoria);
        await this.categoriaRepository.save(newDespesas);
        return newDespesas;
      }

      async deletaCategoria(id: number): Promise<{ deleted: boolean; message?: string }> {
        let data, error
        try {
          await this.categoriaRepository.delete({ id });
          data = { deleted: true };
        } catch (err) {
          data= { deleted: false, message: err.message };
          if(err.code === 'ER_ROW_IS_REFERENCED_2'){
            error = 'Erro de integridade'
          }
          throw new BadRequestException(error)
        }
        
        return data
      }

      async alteraCategoria(categoria: CategoriasDTO): Promise<Categorias> {
        const { id } = categoria;
        await this.categoriaRepository.update({ id }, categoria);
        return this.getOne(id);
      }
}
