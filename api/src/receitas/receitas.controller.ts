import { Controller, Get, Param, Put, Body, Delete, Post, Patch, Query } from '@nestjs/common';
import { ReceitaService } from './receitas.service'
import { Receitas } from './receitas.entity'
import { ReceitasDTO } from './receitas.dto'

@Controller('receitas')
export class ReceitasController {

    constructor(private readonly receitaService: ReceitaService) { }

    @Get()
    async retornaTodasReceitas( @Query('ano') ano?:number, @Query('mes') mes?:number, @Query('pago') pago?:boolean) {   
        return await this.receitaService.retornaTodasReceitas(ano,mes,pago);
    }
    @Get('/total')
    async retornaTotalReceitasRecebidas( @Query('pago') pago:boolean) {
        return this.receitaService.retornaTotalReceitas(0,0,pago);
    }
    @Get('/:ano/mes/:mes')
    async retornaReceitasAnoMes(@Param('ano') ano:number,@Param('mes') mes: number, @Query('pago') pago:boolean) {   
        console.log(pago)
        return await this.receitaService.retornaTodasReceitas(ano,mes,pago);
    }
    @Get('/:ano/mes/:mes/carteira/valor')
    async retornaValorReceitasAgrupadosPorCarteira(@Param('ano') ano:number, @Param('mes') mes: number, @Query('pago') pago:boolean){
        return await this.receitaService.retornaValorReceitasAgrupadosPorCarteira(ano,mes, pago);
    }
    @Get('/:ano/mes/:mes/total')
    async getTotalReceitasAnoMes(@Param('ano') ano:number, @Param('mes') mes: number, @Query('pago') pago:boolean) {
        return this.receitaService.retornaTotalReceitas(ano,mes,pago);
    }
    @Get('/id/:id')
    async getById(@Param('id') id: number): Promise<Receitas> {
        return this.receitaService.getOne(id);
    }
    @Patch('flag/:id')
    async alteraFlagPago(@Param('id') id: number, @Body() receita: { id:number, pago:boolean}): Promise<{ id:number, pago:boolean}> {
        return this.receitaService.alteraFlagPago(receita);
    }  
    @Put('/:id')
    async alteraReceita(@Param('id') id: number, @Body() receita: ReceitasDTO): Promise<Receitas> {
        return this.receitaService.alteraReceita(receita);
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
