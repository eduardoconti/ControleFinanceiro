import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Carteiras } from './carteiras.entity';
import { CarteirasDTO } from './carteiras.dto';

@Injectable()
export class CarteirasService {
  constructor(
    @Inject('CARTEIRAS')
    private carteiraRepository: Repository<Carteiras>,
  ) { }

  async getOne(id: number): Promise<Carteiras> {
    try {
      return this.carteiraRepository.findOneOrFail({ id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async retornaTodasCarteiras(): Promise<Carteiras[]> {
    try {
      return await this.carteiraRepository.find({ order: { id: "ASC" } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async insereCarteira(carteira: CarteirasDTO): Promise<Carteiras> {
    try {
      const newCarteiras = this.carteiraRepository.create(carteira);
      await this.carteiraRepository.save(newCarteiras);
      return newCarteiras;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deletaCarteira(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.carteiraRepository.delete({ id });
      return { deleted: true };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async alteraCarteira(carteira: CarteirasDTO): Promise<Carteiras> {
    try {
      const { id } = carteira;
      await this.carteiraRepository.update({ id }, carteira);
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
