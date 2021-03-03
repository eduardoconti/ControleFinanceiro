import { Controller, Get, Param, Put, Body, Delete, Post, Patch, Query } from '@nestjs/common';
import { DespesaService } from './despesas.service'
import { Despesas } from './despesas.entity'
import { DespesasDTO } from './despesas.dto'

@Controller('despesas')
export class DespesasController {

    constructor(private readonly despesaService: DespesaService) { }

    @Get()
    async retorna(@Query('mes') mes: number) {
     
        return await this.despesaService.retornaTodasDespesas(mes);
    }

    @Get('/mes/:mes')
    async retornaTodasDepesasPorMes(@Param('mes') mes: number) {
        return await this.despesaService.retornaTodasDespesas(mes);
    }
    @Get('/categoria/todas')
    async retornaValorDespesasAgrupadosPorCategoria(){
        return await this.despesaService.retornaValorDespesasAgrupadosPorCategoria(0);
    }
    @Get('/categoria/mes/:mes')
    async retornaValorDespesasAgrupadosPorCategoriaPorMes(@Param('mes') mes: number){
        return await this.despesaService.retornaValorDespesasAgrupadosPorCategoria(mes);
    }

    @Get('/carteira/mes/:mes')
    async retornaValorDespesasAgrupadosPorCarteiraPorMes(@Param('mes') mes: number){
        return await this.despesaService.retornaValorDespesasAgrupadosPorCarteira(mes);
    }

    @Get('/categoria/pago')
    async retornaValorDespesasAgrupadosPorCategoriaPago(){
        return await this.despesaService.retornaValorDespesasAgrupadosPorCategoriaPago(0);
    }
    @Get('/categoria/pago/mes/:mes')
    async retornaValorDespesasAgrupadosPorCategoriaPagoPorMes(@Param('mes') mes: number){
        return await this.despesaService.retornaValorDespesasAgrupadosPorCategoriaPago(mes);
    }
    @Get('/categoria/aberto')
    async retornaValorDespesasAgrupadosPorCategoriaAberto(){
        return await this.despesaService.retornaValorDespesasAgrupadosPorCategoriaAberto(0);
    }
    @Get('/categoria/aberto/mes/:mes')
    async retornaValorDespesasAgrupadosPorCategoriaAbertoPorMes(@Param('mes') mes: number){
        return await this.despesaService.retornaValorDespesasAgrupadosPorCategoriaAberto(mes);
    }
    @Get('/pago')
    async getDespesasPagas() {
        return this.despesaService.retornaDespesasPagas(0);
    }
    @Get('/pago/mes/:mes')
    async getDespesasPagasPorMes(@Param('mes') mes: number) {
        return this.despesaService.retornaDespesasPagas(mes);
    }
    @Get('/pago/valor')
    async getTotalDespesasPagas() {
        return this.despesaService.retornaTotalDespesasPagas(0);
    }

    @Get('/pago/valor/mes/:mes')
    async getTotalDespesasPagasPorMes(@Param('mes') mes: number) {
        return this.despesaService.retornaTotalDespesasPagas(mes);
    }

    @Get('/aberto')
    async getDespesasEmAberto() {
        return this.despesaService.retornaDespesasEmAberto(0);
    }

    @Get('/aberto/mes/:mes')
    async getDespesasEmAbertoPorMes(@Param('mes') mes: number) {
        return this.despesaService.retornaDespesasEmAberto(mes);
    }

    @Get('/aberto/valor')
    async getTotalDespesasAbertas() {
        return this.despesaService.retornaTotalDespesasAbertas(0);
    }

    @Get('/aberto/valor/mes/:mes')
    async getTotalDespesasAbertasPorMes(@Param('mes') mes: number) {
        return this.despesaService.retornaTotalDespesasAbertas(mes);
    }

    @Get('/total')
    async retornaTotalDespesas(){
        return this.despesaService.retornaTotalDespesas(0)
    }

    @Get('/total/mes/:mes')
    async retornaTotalDespesasPorMes(@Param('mes') mes: number){
        return this.despesaService.retornaTotalDespesas(mes)
    }

    @Get('/:id')
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
