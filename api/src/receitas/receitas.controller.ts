import { Controller, Get, Param, Put, Body, Delete, Post } from '@nestjs/common';
import { ReceitaService } from './receitas.service'
import { Receitas } from './receitas.entity'
import { ReceitasDTO } from './receitas.dto'

@Controller('receitas')
export class ReceitasController { 

    constructor(private readonly receitaService: ReceitaService) { }

    @Get()
    async getAll(): Promise<Receitas[]> {
        return await this.receitaService.retornaTodasReceitas();
    }
    @Get('/pago')
    async getReceitasPagas() {
        return this.receitaService.retornaReceitasPagas();
    }
    @Get('/pago/valor')
    async getTotalReceitasPagas() {
        return this.receitaService.retornaTotalReceitasPagas();
    }

    @Get('/aberto')
    async getReceitasEmAberto() {
        return this.receitaService.retornaReceitasEmAberto();
    }

    @Get('/aberto/valor')
    async getTotalReceitasAbertas() {
        return this.receitaService.retornaTotalReceitasAbertas();
    }

    @Get('/total')
    async retornaTotalReceitas(): Promise<Receitas[]>{
        return this.receitaService.retornaTotalReceitas()
    }

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<Receitas> {
        return this.receitaService.getOne(id);
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
