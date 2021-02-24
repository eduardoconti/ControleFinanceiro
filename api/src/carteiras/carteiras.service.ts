import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Carteiras } from './carteiras.entity';
import { CarteirasDTO } from './carteiras.dto'

@Injectable()
export class CarteirasService {

    constructor(
        @Inject('CARTEIRAS')
        private carteiraRepository: Repository<Carteiras>,
      ) { }

      async getOne(id: number): Promise<Carteiras> {
        return this.carteiraRepository.findOneOrFail({ id });
      }

      async retornaTodasCarteiras(): Promise<Carteiras[]> {
        return await this.carteiraRepository.find();
      }

      async insereCarteira(categoria: CarteirasDTO): Promise<Carteiras> {
        const newCarteiras = this.carteiraRepository.create(categoria);
        await this.carteiraRepository.save(newCarteiras);
        return newCarteiras;
      }

      async deletaCarteira(id: number): Promise<{ deleted: boolean; message?: string }> {
        try {
          await this.carteiraRepository.delete({ id });
          return { deleted: true };
        } catch (err) {
          return { deleted: false, message: err.message };
        }
      }

      async alteraCarteira(carteira: CarteirasDTO): Promise<Carteiras> {
        const { id } = carteira;
        await this.carteiraRepository.update({ id }, carteira);
        return this.getOne(id);
      }
      
}
