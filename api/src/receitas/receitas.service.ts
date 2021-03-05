
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Receitas } from './receitas.entity';
import { ReceitasDTO } from './receitas.dto';

const select = [
  'receitas.id',
  'receitas.descricao',
  'receitas.valor',
  'receitas.pago',
  'receitas.carteira',
  'receitas.pagamento',
  'carteira',
];
function CriaWhere(ano?: number, mes?: number, pago?: boolean) {
  return (
    CriaWhereMes(mes) +
    ' AND ' +
    CriaWhereAno(ano) +
    ' AND ' +
    CriaWherePago(pago)
  );
}

function CriaWhereMes(mes: number) {
  return typeof mes === 'undefined' || mes === 0
    ? 'TRUE'
    : 'MONTH(receitas.pagamento)=' + String(mes);
}

function CriaWherePago(pago: boolean) {
  return typeof pago === 'undefined'
    ? 'TRUE'
    : 'receitas.pago=' + pago
}

function CriaWhereAno(ano: number) {
  return ( typeof ano == 'undefined' || ano === 0 )
    ? 'TRUE'
    : 'YEAR(receitas.pagamento)=' + String(ano);
}

@Injectable()
export class ReceitaService {
  constructor(
    @Inject('RECEITAS')
    private receitaRepository: Repository<Receitas>,
  ) {}

  async retornaTodasReceitas(ano?: number, mes?: number, pago?: boolean) {

    !mes ? (mes = 0) : (mes = mes);
    !ano ? (ano = 0) : (ano = ano);

    let receitas = await this.receitaRepository
      .createQueryBuilder('receitas')
      .select(select)
      .innerJoin('receitas.carteira', 'carteira')
      .orderBy('receitas.descricao', 'ASC')
      .where(CriaWhere(ano, mes, pago))
      .getMany();
    return receitas;
  }

  async retornaValorReceitasAgrupadosPorCarteira(ano?:number,mes?: number, pago?:boolean) {
    let receitas = await this.receitaRepository
      .createQueryBuilder('receitas')
      .select([
        'SUM(receitas.valor) valor',
        'carteira.descricao carteira',
        'receitas.carteira id',
      ])
      .innerJoin('receitas.carteira', 'carteira')
      .where(CriaWhere(ano,mes,pago))
      .groupBy('receitas.carteira')
      .orderBy('valor', 'DESC')
      .getRawMany();

    return receitas;
  }

  async retornaTotalReceitas(ano?:number, mes?: number, pago?:boolean) {
    let { sum } = await this.receitaRepository
      .createQueryBuilder('RECEITAS')
      .select('SUM(RECEITAS.valor)', 'sum')
      .where(CriaWhere(ano,mes,pago))
      .getRawOne();

    return sum;
  }

  async getOne(id: number): Promise<Receitas> {
    return this.receitaRepository.findOneOrFail(
      { id },
      { relations: ['carteira'] },
    );
  }

  async insereReceita(receita: ReceitasDTO): Promise<Receitas> {
    if (receita.descricao.length < 1) {
      throw new BadRequestException('Descrição deve ter ao menos 1 caractere');
    }
    if (receita.valor < 0) {
      throw new BadRequestException('Valor deve ser >= 0');
    }
    const newReceitas = this.receitaRepository.create(receita);
    await this.receitaRepository.save(newReceitas);
    return newReceitas;
  }

  async alteraReceita(receita: ReceitasDTO): Promise<Receitas> {
    const { id } = receita;
    await this.receitaRepository.update({ id }, receita);
    return this.getOne(id);
  }

  async alteraFlagPago(receita) {
    const { id } = receita;
    await this.receitaRepository.update({ id }, receita);
    return this.getOne(id);
  }

  async deletaReceita(
    id: number,
  ): Promise<{ deleted: boolean; message?: string }> {

    let data 
    try {
      await this.receitaRepository.delete({ id });
      data =  { deleted: true };
    } catch (err) {
      data = { deleted: false, message: err.message };
    }

    return data 
  }
}
