
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Receitas } from './receitas.entity';
import { ReceitasDTO } from './receitas.dto';

const select = [
  'receitas.id',
  'receitas.descricao',
  'receitas.valor',
  'receitas.pago',
  'receitas.pagamento',
  'carteira',
];

function CriaWhereMes(mes: number) {
  return typeof (mes) === 'undefined' || mes == 0
    ? 'TRUE'
    : 'MONTH(receitas.pagamento)=' + String(mes);
}

function CriaWherePago(pago: boolean) {
  return typeof (pago) === 'undefined'
    ? 'TRUE'
    : 'receitas.pago=' + pago
}

function CriaWhereAno(ano: number) {
  return (typeof (ano) === 'undefined' || ano == 0)
    ? 'TRUE'
    : 'YEAR(receitas.pagamento)=' + String(ano);
}

@Injectable()
export class ReceitaService {
  constructor(
    @Inject('RECEITAS')
    private receitaRepository: Repository<Receitas>,
  ) { }

  async retornaTodasReceitas(ano?: number, mes?: number, pago?: boolean) {
    mes = mes ?? 0
    ano = ano ?? 0

    try {
      let receitas = await this.receitaRepository
        .createQueryBuilder('receitas')
        .select(select)
        .innerJoin('receitas.carteira', 'carteira')
        .where(CriaWhereAno(ano))
        .andWhere(CriaWhereMes(mes))
        .andWhere(CriaWherePago(pago))
        .orderBy('receitas.valor', 'DESC')
        .getMany();
      return receitas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async retornaValorReceitasAgrupadosPorCarteira(ano?: number, mes?: number, pago?: boolean) {
    try {
      let receitas = await this.receitaRepository
        .createQueryBuilder('receitas')
        .select([
          'SUM(receitas.valor) valor',
          'carteira.descricao descricao',
          'receitas.carteira id',
        ])
        .innerJoin('receitas.carteira', 'carteira')
        .where(CriaWhereAno(ano))
        .andWhere(CriaWhereMes(mes))
        .andWhere(CriaWherePago(pago))
        .groupBy('receitas.carteira')
        .orderBy('valor', 'DESC')
        .getRawMany();
      return receitas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async retornaTotalReceitas(ano?: number, mes?: number, pago?: boolean) {
    try {
      let { sum } = await this.receitaRepository
        .createQueryBuilder('receitas')
        .select('SUM(receitas.valor)', 'sum')
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
      let receitas = await this.receitaRepository
        .createQueryBuilder('receitas')
        .select(['SUM(receitas.valor) valor', 'MONTH(receitas.pagamento) mes'])
        .where(CriaWhereAno(ano))
        .andWhere(CriaWherePago(pago))
        .groupBy('MONTH(receitas.pagamento)')
        .getRawMany();
      return receitas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getOne(id: number): Promise<Receitas> {
    try {
      return this.receitaRepository.findOneOrFail(
        { id },
        { relations: ['carteira'] },
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async insereReceita(receita: ReceitasDTO): Promise<Receitas> {
    const newReceitas = this.receitaRepository.create(receita);
    try {
      await this.receitaRepository.save(newReceitas);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return newReceitas;
  }

  async alteraReceita(receita: ReceitasDTO): Promise<Receitas> {
    const { id } = receita;
    try {
      await this.receitaRepository.update({ id }, receita);
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async alteraFlagPago(receita) {
    const { id } = receita;
    try {
      await this.receitaRepository.update({ id }, receita);
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deletaReceita(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.receitaRepository.delete({ id });
      return { deleted: true };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
