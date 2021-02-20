import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Receitas } from './receitas.entity';
import { ReceitasDTO } from './receitas.dto'

const select = [
  "receitas.id",
  "receitas.descricao",
  "receitas.valor",
  "receitas.pago",
  "receitas.carteira",
  "carteira"
]

@Injectable()
export class ReceitaService {
  constructor(
    @Inject('RECEITAS')
    private receitaRepository: Repository<Receitas>,
  ) { }

  async retornaTodasReceitas() {
    let receitas = await this.receitaRepository
      .createQueryBuilder("receitas")
      .select(select)
      .innerJoin("receitas.carteira", "carteira")
      .getMany();

    return receitas
  }

  async retornaReceitasPagas() {
    let receitas = await this.receitaRepository
      .createQueryBuilder("receitas")
      .select(select)
      .innerJoin("receitas.carteira", "carteira")
      .where("receitas.pago=true")
      .getMany();

    return receitas
  }

  async retornaReceitasEmAberto() {
    let receitas = await this.receitaRepository
      .createQueryBuilder("receitas")
      .select(select)
      .innerJoin("receitas.carteira", "carteira")
      .where("receitas.pago=false")
      .getMany();

    return receitas
  }

  async getOne(id: number): Promise<Receitas> {
    return this.receitaRepository.findOneOrFail({ id }, { relations: ['carteira'] });
  }

  async insereReceita(receita: ReceitasDTO): Promise<Receitas> {
    const newReceitas = this.receitaRepository.create(receita);
    await this.receitaRepository.save(newReceitas);
    return newReceitas;
  }

  async alteraReceita(receita: ReceitasDTO): Promise<Receitas> {
    const { id } = receita;
    await this.receitaRepository.update({ id }, receita);
    return this.getOne(id);
  }

  async alteraFlagPago(despesa): Promise<{ id: number, pago: boolean }> {
    const { id } = despesa;
    await this.receitaRepository.update({ id }, despesa);
    return this.getOne(id);
  }

  async deletaReceita(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.receitaRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async retornaTotalReceitas() {

    let { sum } = await this.receitaRepository
      .createQueryBuilder("RECEITAS")
      .select("SUM(RECEITAS.valor)", "sum")
      .getRawOne();

    return sum
  }

  async retornaTotalReceitasPagas() {

    let { sum } = await this.receitaRepository
      .createQueryBuilder("RECEITAS")
      .select("SUM(RECEITAS.valor)", "sum")
      .where("RECEITAS.pago = true")
      .getRawOne();

    return sum
  }

  async retornaTotalReceitasAbertas() {

    let { sum } = await this.receitaRepository
      .createQueryBuilder("RECEITAS")
      .select("SUM(RECEITAS.valor)", "sum")
      .where("RECEITAS.pago = false")
      .getRawOne();

    return sum
  }
}