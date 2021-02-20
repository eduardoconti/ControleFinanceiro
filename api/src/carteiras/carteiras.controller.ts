import { Controller, Get } from '@nestjs/common';
import { CarteirasService } from './carteiras.service'
import { Carteiras } from './carteiras.entity'
import { CarteirasDTO } from './carteiras.dto'
@Controller('carteiras')
export class CarteirasController {

    constructor(private readonly despesaService: CarteirasService) { }

    @Get()
    async getAll(): Promise<Carteiras[]> {
        return await this.despesaService.retornaTodasCarteiras();
    }
}
