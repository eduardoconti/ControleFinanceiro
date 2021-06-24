import { Injectable, Inject, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Despesas } from '../entity/despesas.entity';
import { DespesasDTO } from '../dto/despesas.dto';
import { DespesasResponseDTO } from '../dto/despesas-response.dto';
import { ERROR_MESSAGES } from '../constants';

@Injectable()
export class DespesaService {
  constructor(
    @Inject('DESPESAS')
    private despesaRepository: Repository<Despesas>,
  ) { }

  private CriaWhereMes(mes: number) {
    return !mes || mes == 0
      ? 'TRUE'
      : "date_part('month',despesas.vencimento)=" + String(mes);
  }

  private CriaWherePago(pago: boolean) {
    return typeof pago === 'undefined' ? 'TRUE' : 'despesas.pago=' + pago;
  }

  private CriaWhereAno(ano: number) {
    return !ano || ano == 0
      ? 'TRUE'
      : "date_part('year',despesas.vencimento)=" + String(ano);
  }
  async retornaTodasDespesas(ano?: number, mes?: number, pago?: boolean, userId?: string) {
    mes = mes ?? 0;
    ano = ano ?? 0;
    try {
      const select = ['despesas.id',
        'despesas.descricao',
        'despesas.valor',
        'despesas.pago',
        'despesas.vencimento',
        'categoria',
        'carteira',
        'user']
      let despesas = await this.despesaRepository
        .createQueryBuilder('despesas')
        .select(select)
        .innerJoin('despesas.categoria', 'categoria')
        .innerJoin('despesas.carteira', 'carteira')
        .innerJoin('despesas.user', 'user')
        .orderBy('despesas.descricao', 'ASC')
        .where('user.id= :userId', { userId: userId })
        .andWhere(this.CriaWhereAno(ano))
        .andWhere(this.CriaWhereMes(mes))
        .andWhere(this.CriaWherePago(pago))
        .getMany();

      return despesas.map((despesa => {
        return new DespesasResponseDTO(despesa)
      }));

    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async retornaValorDespesasAgrupadosPorCategoria(
    ano?: number,
    mes?: number,
    pago?: boolean,
    userId?: string
  ) {
    try {
      let despesas = await this.despesaRepository
        .createQueryBuilder('despesas')
        .select(['SUM(despesas.valor) valor', 'categoria.descricao descricao'])
        .innerJoin('despesas.categoria', 'categoria')
        .innerJoin('despesas.user', 'user')
        .where('user.id= :userId', { userId: userId })
        .andWhere(this.CriaWhereAno(ano))
        .andWhere(this.CriaWhereMes(mes))
        .andWhere(this.CriaWherePago(pago))
        .groupBy('categoria.id')
        .orderBy('valor', 'DESC')
        .getRawMany();

      return despesas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async retornaValorDespesasAgrupadosPorCarteira(
    ano?: number,
    mes?: number,
    pago?: boolean,
    userId?: string
  ) {
    try {
      let despesas = await this.despesaRepository
        .createQueryBuilder('despesas')
        .select([
          'SUM(despesas.valor) valor',
          'carteira.descricao descricao',
          'carteira.id id',
        ])
        .innerJoin('despesas.carteira', 'carteira')
        .innerJoin('despesas.user', 'user')
        .where('user.id= :userId', { userId: userId })
        .andWhere(this.CriaWhereAno(ano))
        .andWhere(this.CriaWhereMes(mes))
        .andWhere(this.CriaWherePago(pago))
        .groupBy('carteira.id')
        .orderBy('valor', 'DESC')
        .getRawMany();

      return despesas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async retornaTotalDespesas(ano?: number, mes?: number, pago?: boolean, userId?: string) {
    try {
      let { sum } = await this.despesaRepository
        .createQueryBuilder('despesas')
        .select('SUM(despesas.valor)', 'sum')
        .innerJoin('despesas.user', 'user')
        .where('user.id= :userId', { userId: userId })
        .andWhere(this.CriaWhereAno(ano))
        .andWhere(this.CriaWhereMes(mes))
        .andWhere(this.CriaWherePago(pago))
        .getRawOne();

      return sum;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async retornaDespesasAgrupadasPorMes(ano?: number, pago?: boolean, userId?: string) {
    try {
      let despesas = await this.despesaRepository
        .createQueryBuilder('despesas')
        .select([
          'SUM(despesas.valor) valor',
          "date_part('month',despesas.vencimento) mes",
        ])
        .innerJoin('despesas.user', 'user')
        .where('user.id= :userId', { userId: userId })
        .andWhere(this.CriaWhereAno(ano))
        .andWhere(this.CriaWherePago(pago))
        .groupBy("date_part('month',despesas.vencimento)")
        .getRawMany();

      return despesas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * 
   * @param id 
   * @returns DespesasResponseDTO
   */
  async getOne(id: number): Promise<DespesasResponseDTO> {
    try {
      let despesa = await this.despesaRepository.findOneOrFail(
        { id },
        { relations: ['carteira', 'categoria', 'user'] },
      );
      return new DespesasResponseDTO(despesa);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async insereDespesa(despesa: DespesasDTO): Promise<Despesas> {
    try {
      const newDespesas = await this.despesaRepository.create(despesa);
      await this.despesaRepository.save(newDespesas);
      return newDespesas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async alteraDespesa(id: number, despesa: DespesasDTO): Promise<DespesasResponseDTO> {
    try {
      await this.despesaRepository.update({ id }, despesa);
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async alteraFlagPago(id: number, despesa: DespesasDTO) {
    try {
      await this.despesaRepository.update({ id }, despesa);
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deletaDespesa(
    id: number,
    userId: string
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      this.validateUser(id, userId);
      await this.despesaRepository.delete({ id });
      return { deleted: true };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async validateUser(id: number, userId: string) {
    const despesa = await this.getOne(id);
    if (despesa.user !== userId) {
      throw new UnauthorizedException(ERROR_MESSAGES.USER_TOKEN_NOT_EQUALS_TO_PARAM_URL)
    }
  }
}
