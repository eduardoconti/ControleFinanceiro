import { Controller, Get, Param, Put, Body, Delete, Post,Patch } from '@nestjs/common';
import { ReceitaService } from './receitas.service'
import { Receitas } from './receitas.entity'
import { ReceitasDTO } from './receitas.dto'

@Controller('receitas')
export class ReceitasController { 

    constructor(private readonly receitaService: ReceitaService) { }

    @Get()
    async retornaTodasReceitas() {
        return await this.receitaService.retornaTodasReceitas(0);
    }
    @Get('/mes/:mes')
    async retornaTodasReceitasPorMes(@Param('mes') mes: number) {
        return await this.receitaService.retornaTodasReceitas(mes);
    }
    @Get('/pago')
    async getReceitasPagas() {
        return this.receitaService.retornaReceitasPagas(0);
    }
    @Get('/pago/mes/:mes')
    async getReceitasPagasPorMes(@Param('mes') mes: number) {
        return this.receitaService.retornaReceitasPagas(mes);
    }
    @Get('/pago/valor')
    async getTotalReceitasPagas() {
        return this.receitaService.retornaTotalReceitasPagas(0);
    }
    @Get('/pago/valor/mes/:mes')
    async getTotalReceitasPagasPorMes(@Param('mes') mes: number) {
        return this.receitaService.retornaTotalReceitasPagas(mes);
    }

    @Get('/aberto')
    async getReceitasEmAberto() {
        return this.receitaService.retornaReceitasEmAberto(0);
    }
    @Get('/aberto/mes/:mes')
    async getReceitasEmAbertoPorMes(@Param('mes') mes: number) {
        return this.receitaService.retornaReceitasEmAberto(mes);
    }

    @Get('/aberto/valor')
    async getTotalReceitasAbertas() {
        return this.receitaService.retornaTotalReceitasAbertas(0);
    }

    @Get('/aberto/valor/mes/:mes')
    async getTotalReceitasAbertasPorMes(@Param('mes') mes: number) {
        return this.receitaService.retornaTotalReceitasAbertas(mes);
    }

    @Get('/total')
    async retornaTotalReceitas(): Promise<Receitas[]>{
        return this.receitaService.retornaTotalReceitas(0)
    }

    @Get('/total/mes/:mes')
    async retornaTotalReceitasPorMes(@Param('mes') mes: number): Promise<Receitas[]>{
        return this.receitaService.retornaTotalReceitas(mes)
    }
    @Get('/carteira/mes/:mes')
    async retornaReceitasAgrupadasPorCarteira(@Param('mes') mes: number){
        return this.receitaService.retornaValorReceitasAgrupadasPorCarteira(mes)
    }

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<Receitas> {
        return this.receitaService.getOne(id);
    }

    @Put('/:id')
    async alteraReceita(@Param('id') id: number, @Body() receita: ReceitasDTO): Promise<Receitas> {
        return this.receitaService.alteraReceita(receita);
    }

    @Patch('flag/:id')
    async alteraFlagPago(@Param('id') id: number, @Body() receita: { id:number, pago:boolean}): Promise<{ id:number, pago:boolean}> {
        return this.receitaService.alteraFlagPago(receita);
    }

    @Delete('/:id')
    async deletaReceita(@Param('id') id: number): Promise<{ deleted: boolean }> {
        return this.receitaService.deletaReceita(id);
    }

    @Post()
    async insereReceita(@Body() receita: ReceitasDTO): Promise<Receitas> {
        return this.receitaService.insereReceita(receita);
    }

}
