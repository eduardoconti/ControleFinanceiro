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
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { DespesaService } from './service/despesas.service';
import { Despesas } from './entity/despesas.entity';
import { DespesasDTO } from './dto/despesas.dto';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserLoggedGuard } from 'src/users/guard/user-logged-auth.guard';
import { DespesasResponseDTO } from './dto/despesas-response.dto';

@Controller('despesas')
@ApiTags('despesas')
@UseGuards(JwtAuthGuard, UserLoggedGuard)
export class DespesasController {
  constructor(private readonly despesaService: DespesaService) {}

  @Get()
  @ApiQuery({ name: 'ano', required: false, example: new Date().getFullYear() })
  @ApiQuery({ name: 'mes', required: false, example: new Date().getMonth() })
  @ApiQuery({ name: 'pago', required: false, example: true })

  async retornaTodasDespesas(
    @Request() req: any,
    @Query('ano', ParseIntPipe) ano?: number,
    @Query('mes', ParseIntPipe) mes?: number,
    @Query('pago') pago?: boolean,
  ) {
    const userId = req.user.userid;
    console.log(userId);
    return await this.despesaService.retornaTodasDespesas(ano, mes, pago);
  }
  @Get('/total')
  async retornaTotalDespesas(@Query('pago') pago: boolean) {
    return await this.despesaService.retornaTotalDespesas(0, 0, pago);
  }
  @Get('/:ano/mes')
  async retornaDespesasAgrupadasPorMes(
    @Param('ano', ParseIntPipe) ano: number,
    @Query('pago') pago: boolean,
  ) {
    return await this.despesaService.retornaDespesasAgrupadasPorMes(ano, pago);
  }
  @Get('/:ano/mes/:mes')
  async retornaDespesasAnoMes(
    @Param('ano') ano: number,
    @Param('mes') mes: number,
    @Query('pago') pago: boolean,
  ) {
    return await this.despesaService.retornaTodasDespesas(ano, mes, pago);
  }
  @Get('/:ano/mes/:mes/categoria/valor')
  async retornaValorDespesasAgrupadosPorCategoria(
    @Param('ano') ano: number,
    @Param('mes') mes: number,
    @Query('pago') pago: boolean,
  ) {
    return await this.despesaService.retornaValorDespesasAgrupadosPorCategoria(
      ano,
      mes,
      pago,
    );
  }
  @Get('/:ano/mes/:mes/carteira/valor')
  async retornaValorDespesasAgrupadosPorCarteira(
    @Param('ano') ano: number,
    @Param('mes') mes: number,
    @Query('pago') pago: boolean,
  ) {
    return await this.despesaService.retornaValorDespesasAgrupadosPorCarteira(
      ano,
      mes,
      pago,
    );
  }
  @Get('/:ano/mes/:mes/total')
  async getTotalDespesas(
    @Param('ano') ano: number,
    @Param('mes') mes: number,
    @Query('pago') pago: boolean,
  ) {
    return this.despesaService.retornaTotalDespesas(ano, mes, pago);
  }
  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<DespesasResponseDTO> {
    return this.despesaService.getOne(id);
  }

  @Get('testefind')
  async test() {
    return this.despesaService.testeFind(2021, 2, true);
  }
  @Patch('flag/:id')
  async alteraFlagPago(
    @Param('id') id: number,
    @Body() despesa: DespesasDTO,
  ): Promise<DespesasResponseDTO> {
    return this.despesaService.alteraFlagPago(id,despesa);
  }
  @Put('/:id')
  async alteraDespesa(
    @Param('id') id: number,
    @Body() despesa: DespesasDTO,
  ): Promise<DespesasResponseDTO> {
    return this.despesaService.alteraDespesa(id,despesa);
  }
  @Delete('/:id')
  async deletaDespesa( @Request() req: any, @Param('id') id: number): Promise<{ deleted: boolean }> {
    const userId = req.user.userid;
    return this.despesaService.deletaDespesa(id,userId);
  }
  @Post()
  async insereDespesa(@Body() despesa: DespesasDTO ): Promise<Despesas> {

    return this.despesaService.insereDespesa(despesa);
  }
}
