import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Despesas } from './despesas.entity';
import { DespesasDTO } from './despesas.dto'

const select = [
  "despesas.id",
  "despesas.descricao",
  "despesas.valor",
  "despesas.pago",
  "despesas.carteira",
  "categoria",
  "carteira"
]

@Injectable()
export class DespesaService {
  constructor(
    @Inject('DESPESAS')
    private despesaRepository: Repository<Despesas>,
  ) { }

  async retornaTodasDespesas() {
    let despesas = await this.despesaRepository
      .createQueryBuilder("despesas")
      .select(select)
      .innerJoin("despesas.categoria", "categoria")
      .innerJoin("despesas.carteira", "carteira")
      .orderBy("despesas.descricao")
      .getMany();

    return despesas
  }

  async retornaDespesasPagas() {
    let despesas = await this.despesaRepository
      .createQueryBuilder("despesas")
      .select(select)
      .innerJoin("despesas.categoria", "categoria")
      .innerJoin("despesas.carteira", "carteira")
      .where('despesas.pago=true')
      .orderBy("despesas.descricao")
      .getMany();

    return despesas
  }

  async retornaDespesasEmAberto() {

    let despesas = await this.despesaRepository
      .createQueryBuilder("despesas")
      .select(select)
      .innerJoin("despesas.categoria", "categoria")
      .innerJoin("despesas.carteira", "carteira")
      .where('despesas.pago=false')
      .orderBy("despesas.descricao")
      .getMany();

    return despesas
  }

  async getOne(id: number): Promise<Despesas> {
    return this.despesaRepository.findOneOrFail({ id }, { relations: ['carteira', 'categoria'] });
  }

  async insereDespesa(despesa: DespesasDTO): Promise<Despesas> {
    const newDespesas = this.despesaRepository.create(despesa);
    await this.despesaRepository.save(newDespesas);
    return newDespesas;
  }

  async alteraDespesa(despesa: DespesasDTO): Promise<Despesas> {
    const { id } = despesa;
    await this.despesaRepository.update({ id }, despesa);
    return this.getOne(id);
  }

  async alteraFlagPago(despesa): Promise<{ id: number, pago: boolean }> {
    const { id } = despesa;
    await this.despesaRepository.update({ id }, despesa);
    return this.getOne(id);
  }

  async deletaDespesa(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.despesaRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async retornaTotalDespesas() {

    let { sum } = await this.despesaRepository
      .createQueryBuilder("DESPESAS")
      .select("SUM(DESPESAS.valor)", "sum")
      .getRawOne();

    return sum
  }

  async retornaTotalDespesasPagas() {

    let { sum } = await this.despesaRepository
      .createQueryBuilder("DESPESAS")
      .select("SUM(DESPESAS.valor)", "sum")
      .where("DESPESAS.pago = true")
      .getRawOne();

    return sum
  }

  async retornaTotalDespesasAbertas() {

    let { sum } = await this.despesaRepository
      .createQueryBuilder("DESPESAS")
      .select("SUM(DESPESAS.valor)", "sum")
      .where("DESPESAS.pago = false")
      .getRawOne();

    return sum
  }
}