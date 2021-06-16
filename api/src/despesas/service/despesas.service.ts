import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Despesas } from '../entity/despesas.entity';
import { DespesasDTO } from '../dto/despesas.dto';

const select = [
  'despesas.id',
  'despesas.descricao',
  'despesas.valor',
  'despesas.pago',
  'despesas.vencimento',
  'categoria',
  'carteira',
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
  return !ano || ano == 0 ? 'TRUE' : "date_part('year',despesas.vencimento)=" + String(ano);
}

@Injectable()
export class DespesaService {
  constructor(
    @Inject('DESPESAS')
    private despesaRepository: Repository<Despesas>,
  ) { }

  async retornaTodasDespesas(ano?: number, mes?: number, pago?: boolean) {
    mes = mes ?? 0;
    ano = ano ?? 0;
    try {
      let despesas = await this.despesaRepository
        .createQueryBuilder('despesas')
        .select(select)
        .innerJoin('despesas.categoria', 'categoria')
        .innerJoin('despesas.carteira', 'carteira')
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
          'despesas.carteira id',
        ])
        .innerJoin('despesas.carteira', 'carteira')
        .where(CriaWhereAno(ano))
        .andWhere(CriaWhereMes(mes))
        .andWhere(CriaWherePago(pago))
        .groupBy('despesas.carteira')
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
        .select('SUM(despesas.valor) valor')
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
        .select(['SUM(despesas.valor) valor', "date_part('month',despesas.vencimento) mes"])
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
        relations: [
          'categoria',
          'carteira'
        ],
        where:{
          vencimento: Between( new Date(ano, mes), new Date(2021,18)),
          pago: pago          
        }       
      })
      return despesas
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getOne(id: number): Promise<Despesas> {
    try {
      return this.despesaRepository.findOneOrFail(
        { id },
        { relations: ['carteira', 'categoria'] },
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async insereDespesa(despesa: DespesasDTO): Promise<Despesas> {
    try {
      const newDespesas = this.despesaRepository.create(despesa);
      await this.despesaRepository.save(newDespesas);
      return newDespesas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async alteraDespesa(despesa: DespesasDTO): Promise<Despesas> {
    try {
      const { id } = despesa;
      await this.despesaRepository.update({ id }, despesa);
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async alteraFlagPago(despesa) {
    try {
      const { id } = despesa;
      await this.despesaRepository.update({ id }, despesa);
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deletaDespesa(
    id: number,
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.getOne(id);
      await this.despesaRepository.delete({ id });
      return { deleted: true };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
