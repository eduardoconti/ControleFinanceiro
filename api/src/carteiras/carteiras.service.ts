import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Carteiras } from './carteiras.entity';
import { CarteirasDTO } from './carteiras.dto';

@Injectable()
export class CarteirasService {
  constructor(
    @Inject('CARTEIRAS')
    private carteiraRepository: Repository<Carteiras>,
  ) {}

  async getOne(id: number): Promise<Carteiras> {
    return this.carteiraRepository.findOneOrFail({ id });
  }

  async retornaTodasCarteiras(): Promise<Carteiras[]> {
    return await this.carteiraRepository.find({order:{id:"ASC"}});
  }

  async insereCarteira(carteira: CarteirasDTO): Promise<Carteiras> {
    if (carteira.descricao.length < 1) {
      throw new BadRequestException('Descrição deve ter ao menos 1 caractere');
    }
    const newCarteiras = this.carteiraRepository.create(carteira);
    await this.carteiraRepository.save(newCarteiras);
    return newCarteiras;
  }

  async deletaCarteira(
    id: number,
  ): Promise<{ deleted: boolean; message?: string }> {
    let data, error;
    try {
      await this.carteiraRepository.delete({ id });
      data = { deleted: true };
    } catch (err) {
      data = { deleted: false, message: err.message };
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        error = 'Erro de integridade';
      }
      throw new BadRequestException(error);
    }
    return data;
  }

  async alteraCarteira(carteira: CarteirasDTO): Promise<Carteiras> {
    const { id } = carteira;
    await this.carteiraRepository.update({ id }, carteira);
    return this.getOne(id);
  }
}
