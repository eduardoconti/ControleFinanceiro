import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Delete,
  Post,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReceitaService } from './service/receitas.service';
import { Receitas } from './entity/receitas.entity';
import { ReceitasDTO } from './dto/receitas.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('receitas')
@ApiTags('receitas')
@UseGuards(JwtAuthGuard)
export class ReceitasController {
  constructor(private readonly receitaService: ReceitaService) {}

  @Get()
  async retornaTodasReceitas(
    @Query('ano') ano?: number,
    @Query('mes') mes?: number,
    @Query('pago') pago?: boolean,
  ) {
    return await this.receitaService.retornaTodasReceitas(ano, mes, pago);
  }
  @Get('/total')
  async retornaTotalReceitasRecebidas(@Query('pago') pago: boolean) {
    return this.receitaService.retornaTotalReceitas(0, 0, pago);
  }
  @Get('/:ano/mes')
  async retornaReceitasAgrupadasPorMes(
    @Param('ano') ano: number,
    @Query('pago') pago: boolean,
  ) {
    return await this.receitaService.retornaDespesasAgrupadasPorMes(ano, pago);
  }
  @Get('/:ano/mes/:mes')
  async retornaReceitasAnoMes(
    @Param('ano') ano: number,
    @Param('mes') mes: number,
    @Query('pago') pago: boolean,
  ) {
    return await this.receitaService.retornaTodasReceitas(ano, mes, pago);
  }
  @Get('/:ano/mes/:mes/carteira/valor')
  async retornaValorReceitasAgrupadosPorCarteira(
    @Param('ano') ano: number,
    @Param('mes') mes: number,
    @Query('pago') pago: boolean,
  ) {
    return await this.receitaService.retornaValorReceitasAgrupadosPorCarteira(
      ano,
      mes,
      pago,
    );
  }
  @Get('/:ano/mes/:mes/total')
  async getTotalReceitasAnoMes(
    @Param('ano') ano: number,
    @Param('mes') mes: number,
    @Query('pago') pago: boolean,
  ) {
    return this.receitaService.retornaTotalReceitas(ano, mes, pago);
  }
  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<Receitas> {
    return this.receitaService.getOne(id);
  }
  @Patch('flag/:id')
  async alteraFlagPago(
    @Param('id') id: number,
    @Body() receita: ReceitasDTO,
  ): Promise<{ id: number; pago: boolean }> {
    return this.receitaService.alteraFlagPago(receita, id);
  }
  @Put('/:id')
  async alteraReceita(
    @Param('id') id: number,
    @Body() receita: ReceitasDTO,
  ): Promise<Receitas> {
    return this.receitaService.alteraReceita(receita, id);
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
