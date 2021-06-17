import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoriasDTO } from '../dto/categorias.dto';
import { Categorias } from '../entity/categorias.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @Inject('CATEGORIAS')
    private categoriaRepository: Repository<Categorias>,
  ) {}

  async getOne(id: number): Promise<Categorias> {
    try {
      return await this.categoriaRepository.findOneOrFail({ id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async retornaTodasCategorias(): Promise<Categorias[]> {
    try {
      return await this.categoriaRepository.find({ order: { id: 'ASC' } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async insereCategoria(categoria: CategoriasDTO): Promise<Categorias> {
    try {
      const newDespesas = await this.categoriaRepository.create(categoria);
      await this.categoriaRepository.save(newDespesas);
      return newDespesas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deletaCategoria(
    id: number,
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.categoriaRepository.delete({ id });
      return { deleted: true };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async alteraCategoria(categoria: CategoriasDTO): Promise<Categorias> {
    try {
      const { id } = categoria;
      await this.categoriaRepository.update({ id }, categoria);
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
