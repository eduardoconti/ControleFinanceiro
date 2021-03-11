import {
  Injectable,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Despesas } from './despesas.entity';
import { DespesasDTO } from './despesas.dto';

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
  return !mes || mes === 0
    ? 'TRUE'
    : 'MONTH(despesas.vencimento)=' + String(mes);
}

function CriaWherePago(pago: boolean) {
  return typeof pago === 'undefined' ? 'TRUE' : 'despesas.pago=' + pago;
}

function CriaWhereAno(ano: number) {
  return !ano || ano === 0
    ? 'TRUE'
    : 'YEAR(despesas.vencimento)=' + String(ano);
}

@Injectable()
export class DespesaService {
  constructor(
    @Inject('DESPESAS')
    private despesaRepository: Repository<Despesas>,
  ) {}

  async retornaTodasDespesas(ano?: number, mes?: number, pago?: boolean) {
    mes = mes ?? 0
    ano = ano ?? 0

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
  }

  async retornaValorDespesasAgrupadosPorCategoria(
    ano?: number,
    mes?: number,
    pago?: boolean,
  ) {
    let despesas = await this.despesaRepository
      .createQueryBuilder('despesas')
      .select(['SUM(despesas.valor) valor', 'categoria.descricao descricao'])
      .innerJoin('despesas.categoria', 'categoria')
      .where(CriaWhereAno(ano))
      .andWhere(CriaWhereMes(mes))
      .andWhere(CriaWherePago(pago))
      .groupBy('despesas.categoria')
      .orderBy('valor', 'DESC')
      .getRawMany();

    return despesas;
  }

  async retornaValorDespesasAgrupadosPorCarteira(
    ano?: number,
    mes?: number,
    pago?: boolean,
  ) {
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
  }

  async retornaTotalDespesas(ano?: number, mes?: number, pago?: boolean) {
    let { sum } = await this.despesaRepository
      .createQueryBuilder('DESPESAS')
      .select('SUM(DESPESAS.valor)', 'sum')
      .where(CriaWhereAno(ano))
      .andWhere(CriaWhereMes(mes))
      .andWhere(CriaWherePago(pago))
      .getRawOne();

    return sum;
  }

  async retornaDespesasAgrupadasPorMes(
    ano?: number,
    pago?: boolean,
  ) {
    let despesas = await this.despesaRepository
      .createQueryBuilder('despesas')
      .select(['SUM(despesas.valor) valor', 'MONTH(despesas.vencimento) mes'])
      .where(CriaWhereAno(ano))
      .andWhere(CriaWherePago(pago))
      .groupBy('MONTH(despesas.vencimento)')
      .getRawMany();

    return despesas;
  }
  async getOne(id: number): Promise<Despesas> {
    return this.despesaRepository.findOneOrFail(
      { id },
      { relations: ['carteira', 'categoria'] },
    );
  }

  async insereDespesa(despesa: DespesasDTO): Promise<Despesas> {
    let error = '';

    if (despesa.descricao.length < 1) {
      throw new BadRequestException('Descrição deve ter ao menos 1 caractere');
    }
    if (despesa.valor < 0) {
      throw new BadRequestException('Valor deve ser >= 0');
    }

    try {
      const newDespesas = this.despesaRepository.create(despesa);
      await this.despesaRepository.save(newDespesas);
      return newDespesas;
    } catch (err) {
      if (err.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
        error = 'Erro de integridade';
      }
      throw new BadRequestException(error);
    }
  }

  async alteraDespesa(despesa: DespesasDTO): Promise<Despesas> {
    if (despesa.descricao.length < 1) {
      throw new BadRequestException('Descrição deve ter ao menos 1 caractere');
    }
    if (despesa.valor < 0) {
      throw new BadRequestException('Valor deve ser >= 0');
    }

    const { id } = despesa;
    await this.despesaRepository.update({ id }, despesa);
    return this.getOne(id);
  }

  async alteraFlagPago(despesa) {
    const { id } = despesa;
    await this.despesaRepository.update({ id }, despesa);
    return this.getOne(id);
  }

  async deletaDespesa(
    id: number,
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.despesaRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
