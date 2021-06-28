import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Receitas } from '../entity/receitas.entity';
import { ReceitasDTO } from '../dto/receitas.dto';

const select = [
  'receitas.id',
  'receitas.descricao',
  'receitas.valor',
  'receitas.pago',
  'receitas.pagamento',
  'carteira',
  'user',
];

function CriaWhereMes(mes: number) {
  return !mes || mes == 0
    ? 'TRUE'
    : "date_part('month',receitas.pagamento)=" + String(mes);
}

function CriaWherePago(pago: boolean) {
  return typeof pago === 'undefined' ? 'TRUE' : 'receitas.pago=' + pago;
}

function CriaWhereAno(ano: number) {
  return !ano || ano == 0
    ? 'TRUE'
    : "date_part('year',receitas.pagamento)=" + String(ano);
}

@Injectable()
export class ReceitaService {
  constructor(
    @Inject('RECEITAS')
    private receitaRepository: Repository<Receitas>,
  ) {}

  async retornaTodasReceitas(
    ano?: number,
    mes?: number,
    pago?: boolean,
  ): Promise<Receitas[]> {
    mes = mes ?? 0;
    ano = ano ?? 0;

    try {
      let receitas = await this.receitaRepository
        .createQueryBuilder('receitas')
        .select(select)
        .innerJoin('receitas.carteira', 'carteira')
        .innerJoin('receitas.user', 'user')
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

  async retornaValorReceitasAgrupadosPorCarteira(
    ano?: number,
    mes?: number,
    pago?: boolean,
  ) {
    try {
      let receitas = await this.receitaRepository
        .createQueryBuilder('receitas')
        .select([
          'SUM(receitas.valor) valor',
          'carteira.descricao descricao',
          'carteira.id id',
        ])
        .innerJoin('receitas.carteira', 'carteira')
        .where(CriaWhereAno(ano))
        .andWhere(CriaWhereMes(mes))
        .andWhere(CriaWherePago(pago))
        .groupBy('carteira.id')
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
        .select([
          'SUM(receitas.valor) valor',
          "date_part('month',receitas.pagamento) mes",
        ])
        .where(CriaWhereAno(ano))
        .andWhere(CriaWherePago(pago))
        .groupBy("date_part('month',receitas.pagamento)")
        .getRawMany();
      return receitas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  /**
   *
   * @param id
   * @returns Receitas
   */
  async getOne(id: number): Promise<Receitas> {
    try {
      return await this.receitaRepository.findOneOrFail(
        { id },
        { relations: ['carteira', 'user'] },
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async insereReceita(receita: ReceitasDTO): Promise<Receitas> {
    const newReceitas = await this.receitaRepository.create(receita);
    try {
      await this.receitaRepository.save(newReceitas);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return newReceitas;
  }

  async alteraReceita(receita: ReceitasDTO, id: number): Promise<Receitas> {
    try {
      await this.receitaRepository.update({ id }, receita);
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async alteraFlagPago(receita, id: number): Promise<Receitas> {
    try {
      await this.receitaRepository.update({ id }, receita);
      return this.getOne(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deletaReceita(
    id: number,
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.receitaRepository.delete({ id });
      return { deleted: true };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
