import { Controller, Get, Param, Put, Body, Delete, Post } from '@nestjs/common';
import { DespesaService } from './despesas.service'
import { Despesas } from './despesas.entity'
import { DespesasDTO } from './despesas.dto'

@Controller('despesas')
export class DespesasController {

    constructor(private readonly despesaService: DespesaService) { }

    @Get()
    async getAll(): Promise<Despesas[]> {
        return await this.despesaService.retornaTodasDespesas();
    }
    @Get('/pago')
    async getDespesasPagas() {
        return this.despesaService.retornaDespesasPagas();
    }
    @Get('/pago/valor')
    async getTotalDespesasPagas() {
        return this.despesaService.retornaTotalDespesasPagas();
    }

    @Get('/aberto')
    async getDespesasEmAberto() {
        return this.despesaService.retornaDespesasEmAberto();
    }

    @Get('/aberto/valor')
    async getTotalDespesasAbertas() {
        return this.despesaService.retornaTotalDespesasAbertas();
    }

    @Get('/total')
    async retornaTotalDespesas(): Promise<Despesas[]>{
        return this.despesaService.retornaTotalDespesas()
    }

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<Despesas> {
        return this.despesaService.getOne(id);
    }

    @Put('/:id')
    async alteraDespesa(@Param('id') id: number, @Body() despesa: DespesasDTO): Promise<Despesas> {
        return this.despesaService.alteraDespesa(despesa);
    }

    @Delete('/:id')
    async deletaDespesa(@Param('id') id: number): Promise<{ deleted: boolean }> {
        return this.despesaService.deletaDespesa(id);
    }

    @Post()
    async insereDespesa(@Body() despesa: DespesasDTO): Promise<Despesas> {
        return this.despesaService.insereDespesa(despesa);
    }

}
