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
  ParseBoolPipe,
} from '@nestjs/common';
import { DespesaService } from './service/despesas.service';
import { Despesas } from './entity/despesas.entity';
import { DespesasDTO } from './dto/despesas.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserLoggedGuard } from 'src/users/guard/user-logged-auth.guard';
import { DespesasResponseDTO } from './dto/despesas-response.dto';
import { User } from 'src/shared/decorator/user.decorator';
import { UserPayloadInterface } from 'src/auth/interfaces/user-payload.interface';

@Controller('despesas')
@ApiTags('despesas')
@UseGuards(JwtAuthGuard)
export class DespesasController {
  constructor(private readonly despesaService: DespesaService) {
    
  }

  @Get()
  @ApiQuery({ name: 'ano', required: false, example: new Date().getFullYear() })
  @ApiQuery({ name: 'mes', required: false, example: new Date().getMonth() })
  @ApiQuery({ name: 'pago', required: false, example: true })
  async retornaTodasDespesas(
    @User() user: UserPayloadInterface,
    @Query('ano', ParseIntPipe) ano?: number,
    @Query('mes', ParseIntPipe) mes?: number,
    @Query('pago') pago?: boolean,
  ) {
    return await this.despesaService.retornaTodasDespesas(ano, mes, pago, user.userId);
  }

  @Get('/total')
  async retornaTotalDespesas(
    @User() user: UserPayloadInterface,
    @Query('pago') pago?: boolean) {

    return await this.despesaService.retornaTotalDespesas(0, 0, pago, user.userId);
  }

  @Get('/:ano/mes')
  async retornaDespesasAgrupadasPorMes(
    @User() user: UserPayloadInterface,
    @Param('ano', ParseIntPipe) ano: number,
    @Query('pago', ParseBoolPipe) pago?: boolean,
  ) {
    return await this.despesaService.retornaDespesasAgrupadasPorMes(ano, pago,user.userId);
  }

  @Get('/:ano/mes/:mes')
  async retornaDespesasAnoMes(
    @User() user: UserPayloadInterface,
    @Param('ano') ano: number,
    @Param('mes') mes: number,
    @Query('pago') pago: boolean,
  ) {

    return await this.despesaService.retornaTodasDespesas(ano, mes, pago,user.userId);
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

  @Patch('flag/:id')
  async alteraFlagPago(
    @Param('id') id: number,
    @Body() despesa: DespesasDTO,
  ): Promise<DespesasResponseDTO> {
    return this.despesaService.alteraFlagPago(id, despesa);
  }

  @Put('/:id')
  async alteraDespesa(
    @Param('id') id: number,
    @Body() despesa: DespesasDTO,
  ): Promise<DespesasResponseDTO> {
    return this.despesaService.alteraDespesa(id, despesa);
  }

  @Delete('/:id')
  async deletaDespesa(@Request() req: any, @Param('id') id: number): Promise<{ deleted: boolean }> {
    const userId = req.user.userid;
    return this.despesaService.deletaDespesa(id, userId);
  }

  @Post()
  @UseGuards(UserLoggedGuard)
  async insereDespesa(@Body() despesa: DespesasDTO): Promise<Despesas> {
    return this.despesaService.insereDespesa(despesa);
  }
}
