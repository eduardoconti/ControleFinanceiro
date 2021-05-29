import { Controller, Get, Param, Put, Body, Delete, Post, Patch, Query } from '@nestjs/common';
import { DespesaService } from './despesas.service'
import { Despesas } from './despesas.entity'
import { DespesasDTO } from './despesas.dto'
import { ApiTags } from '@nestjs/swagger';

@Controller('despesas')
@ApiTags('despesas')
export class DespesasController {

    constructor(private readonly despesaService: DespesaService) { }

    @Get()
    async retornaTodasDespesas( @Query('ano') ano?:number, @Query('mes') mes?:number, @Query('pago') pago?:boolean) {   
        return await this.despesaService.retornaTodasDespesas(ano,mes,pago);
    }
    @Get('/total')
    async retornaTotalDespesas( @Query('pago') pago:boolean) {   
        return await this.despesaService.retornaTotalDespesas(0,0,pago);
    }
    @Get('/:ano/mes')
    async retornaDespesasAgrupadasPorMes(@Param('ano') ano:number, @Query('pago') pago:boolean) {   
        return await this.despesaService.retornaDespesasAgrupadasPorMes(ano, pago);
    }
    @Get('/:ano/mes/:mes')
    async retornaDespesasAnoMes(@Param('ano') ano:number,@Param('mes') mes: number, @Query('pago') pago:boolean) {   
        return await this.despesaService.retornaTodasDespesas(ano,mes,pago);
    }
    @Get('/:ano/mes/:mes/categoria/valor')
    async retornaValorDespesasAgrupadosPorCategoria(@Param('ano') ano:number, @Param('mes') mes: number, @Query('pago') pago:boolean){
        return await this.despesaService.retornaValorDespesasAgrupadosPorCategoria(ano,mes,pago);
    }
    @Get('/:ano/mes/:mes/carteira/valor')
    async retornaValorDespesasAgrupadosPorCarteira(@Param('ano') ano:number, @Param('mes') mes: number, @Query('pago') pago:boolean){
        return await this.despesaService.retornaValorDespesasAgrupadosPorCarteira(ano,mes, pago);
    }
    @Get('/:ano/mes/:mes/total')
    async getTotalDespesas(@Param('ano') ano:number, @Param('mes') mes: number, @Query('pago') pago:boolean) {
        return this.despesaService.retornaTotalDespesas(ano,mes,pago);
    }
    @Get('/id/:id')
    async getById(@Param('id') id: number): Promise<Despesas> {
        return this.despesaService.getOne(id);
    }
    @Patch('flag/:id')
    async alteraFlagPago(@Param('id') id: number, @Body() despesa: { id:number, pago:boolean}): Promise<{ id:number, pago:boolean}> {
        return this.despesaService.alteraFlagPago(despesa);
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
