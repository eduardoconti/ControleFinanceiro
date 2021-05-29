import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CarteirasService } from './carteiras.service'
import { Carteiras } from './carteiras.entity'
import { CarteirasDTO } from './carteiras.dto'
import { ApiTags } from '@nestjs/swagger';
@Controller('carteiras')
@ApiTags('carteiras')
export class CarteirasController {

    constructor(private readonly carteiraService: CarteirasService) { }

    @Get()
    async getAll(): Promise<Carteiras[]> {
        return await this.carteiraService.retornaTodasCarteiras();
    }

    @Post()
    async insereCarteira(@Body() despesa: CarteirasDTO): Promise<Carteiras> {
        return this.carteiraService.insereCarteira(despesa);
    }

    @Delete('/:id')
    async deletaCarteira(@Param('id') id: number): Promise<{ deleted: boolean }> {
        return this.carteiraService.deletaCarteira(id);
    }

    @Put('/:id')
    async alteraDespesa(@Param('id') id: number, @Body() despesa: CarteirasDTO): Promise<Carteiras> {
        return this.carteiraService.alteraCarteira(despesa);
    }

}
