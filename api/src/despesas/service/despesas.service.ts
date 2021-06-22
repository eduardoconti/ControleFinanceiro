import { Injectable, Inject, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Despesas } from '../entity/despesas.entity';
import { DespesasDTO } from '../dto/despesas.dto';
import { ERROR_MESSAGES } from 'src/shared/constants';
import { DespesasResponseDTO } from '../dto/despesas-response.dto';

const select = [
  'despesas.id',
  'despesas.descricao',
  'despesas.valor',
  'despesas.pago',
  'despesas.vencimento',
  'categoria',
  'carteira',
  'user.id'
];

function CriaWhereMes(mes: number) {
  return !mes || mes == 0
    ? 'TRUE'
    : "date_part('month',despesas.vencimento)=" + String(mes);
}

function CriaWherePago(pago: boolean) {
  return typeof pago === 'undefined' ? 'TRUE' : 'despesas.pago=' + pago;
}

function CriaWhereAno(ano: number) {
  return !ano || ano == 0
    ? 'TRUE'
    : "date_part('year',despesas.vencimento)=" + String(ano);
}

@Injectable()
export class DespesaService {
  constructor(
    @Inject('DESPESAS')
    private despesaRepository: Repository<Despesas>,
  ) {}

  async retornaTodasDespesas(ano?: number, mes?: number, pago?: boolean) {
    mes = mes ?? 0;
    ano = ano ?? 0;
    try {
      let despesas = await this.despesaRepository
        .createQueryBuilder('despesas')
        .select(select)
        .innerJoin('despesas.categoria', 'categoria')
        .innerJoin('despesas.carteira', 'carteira')
        .innerJoin('despesas.user', 'user')
        .orderBy('despesas.descricao', 'ASC')
        .where(CriaWhereAno(ano))
        .andWhere(CriaWhereMes(mes))
        .andWhere(CriaWherePago(pago))
        .getMany();
      return despesas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async retornaValorDespesasAgrupadosPorCategoria(
    ano?: number,
    mes?: number,
    pago?: boolean,
  ) {
    try {
      let despesas = await this.despesaRepository
        .createQueryBuilder('despesas')
        .select(['SUM(despesas.valor) valor', 'categoria.descricao descricao'])
        .innerJoin('despesas.categoria', 'categoria')
        .where(CriaWhereAno(ano))
        .andWhere(CriaWhereMes(mes))
        .andWhere(CriaWherePago(pago))
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
        .where(CriaWhereAno(ano))
        .andWhere(CriaWhereMes(mes))
        .andWhere(CriaWherePago(pago))
        .groupBy('carteira.id')
        .orderBy('valor', 'DESC')
        .getRawMany();

      return despesas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async retornaTotalDespesas(ano?: number, mes?: number, pago?: boolean) {
    try {
      let { sum } = await this.despesaRepository
        .createQueryBuilder('despesas')
        .select('SUM(despesas.valor)', 'sum')
        .where(CriaWhereAno(ano))
        .andWhere(CriaWhereMes(mes))
        .andWhere(CriaWherePago(pago))
        .getRawOne();

      return sum;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async retornaDespesasAgrupadasPorMes(ano?: number, pago?: boolean) {
    try {
      let despesas = await this.despesaRepository
        .createQueryBuilder('despesas')
        .select([
          'SUM(despesas.valor) valor',
          "date_part('month',despesas.vencimento) mes",
        ])
        .where(CriaWhereAno(ano))
        .groupBy("date_part('month',despesas.vencimento)")
        .getRawMany();

      return despesas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async testeFind(ano?: number, mes?: number, pago: boolean = false) {
    ano ?? new Date().getFullYear();
    mes ?? 0;

    try {
      let despesas = await this.despesaRepository.find({
        relations: ['categoria', 'carteira'],
        where: {
          vencimento: Between(new Date(ano, mes), new Date(2021, 18)),
          pago: pago,
        },
      });
      return despesas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getOne(id: number): Promise<DespesasResponseDTO> {
    try {
      let despesa =  await this.despesaRepository.findOneOrFail(
        { id },
        { relations: ['carteira', 'categoria', 'user'] },
      );
      return despesa.EntityToResponse(despesa)
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
      const despesa = await this.getOne(id);
      if (despesa.user!== userId){
        throw new UnauthorizedException(ERROR_MESSAGES.USER_TOKEN_NOT_EQUALS_TO_PARAM_URL)
      } 
      await this.despesaRepository.delete({ id });
      return { deleted: true };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
