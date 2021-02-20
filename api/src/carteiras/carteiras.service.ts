import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Carteiras } from './carteiras.entity';
import { CarteirasDTO } from './carteiras.dto'

@Injectable()
export class CarteirasService {

    constructor(
        @Inject('CARTEIRAS')
        private receitaRepository: Repository<Carteiras>,
      ) { }
    
      async retornaTodasCarteiras(): Promise<Carteiras[]> {
        return await this.receitaRepository.find();
      }
}
