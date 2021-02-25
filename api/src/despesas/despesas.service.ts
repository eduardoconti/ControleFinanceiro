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
  "despesas.vencimento",
  "categoria",
  "carteira"
]
function CriaWhere( mes ){
  if(mes===0){
    return "TRUE"
  }else {
    return "MONTH(despesas.vencimento)=" + String(mes)
  }
}
@Injectable()
export class DespesaService {
  constructor(
    @Inject('DESPESAS')
    private despesaRepository: Repository<Despesas>,
  ) { }

  async retornaTodasDespesas(mes: number) {
    let despesas = await this.despesaRepository
      .createQueryBuilder("despesas")
      .select(select)
      .innerJoin("despesas.categoria", "categoria")
      .innerJoin("despesas.carteira", "carteira")
      .orderBy("despesas.descricao", 'DESC')
      .where(CriaWhere( mes ))
      .getMany();
    return despesas
  }

  async retornaDespesasPagas(mes:number) {
    let despesas = await this.despesaRepository
      .createQueryBuilder("despesas")
      .select(select)
      .innerJoin("despesas.categoria", "categoria")
      .innerJoin("despesas.carteira", "carteira")
      .where('despesas.pago=true AND ' + CriaWhere(mes)) 
      .orderBy("despesas.descricao", 'DESC')
      .getMany();

    return despesas
  }

  async retornaDespesasEmAberto(mes:number) {

    let despesas = await this.despesaRepository
      .createQueryBuilder("despesas")
      .select(select)
      .innerJoin("despesas.categoria", "categoria")
      .innerJoin("despesas.carteira", "carteira")
      .where('despesas.pago=false AND ' + CriaWhere(mes))
      .orderBy("despesas.descricao", 'DESC')
      .getMany();

    return despesas
  }

  async retornaValorDespesasAgrupadosPorCategoria( mes:number) {

    let despesas = await this.despesaRepository
      .createQueryBuilder("despesas")
      .select([
        "SUM(despesas.valor) valor",
        "categoria.descricao categoria"
      ])
      .innerJoin("despesas.categoria", "categoria")
      .where(CriaWhere(mes))
      .groupBy("despesas.categoria")
      .orderBy("valor", 'DESC')
      .getRawMany();

    return despesas
  }

  async retornaValorDespesasAgrupadosPorCategoriaPago(mes:number) {

    let despesas = await this.despesaRepository
      .createQueryBuilder("despesas")
      .select([
        "SUM(despesas.valor) valor",
        "categoria.descricao categoria"
      ])
      .innerJoin("despesas.categoria", "categoria")
      .where("despesas.pago=true AND " + CriaWhere(mes) )
      .groupBy("despesas.categoria")
      .orderBy("valor", 'DESC')
      .getRawMany();

    return despesas
  }

  async retornaValorDespesasAgrupadosPorCategoriaAberto(mes:number) {

    let despesas = await this.despesaRepository
      .createQueryBuilder("despesas")
      .select([
        "SUM(despesas.valor) valor",
        "categoria.descricao categoria"
      ])
      .innerJoin("despesas.categoria", "categoria")
      .where("despesas.pago=false AND " + CriaWhere(mes))
      .groupBy("despesas.categoria")
      .orderBy("valor", 'DESC')
      .getRawMany();

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

  async retornaTotalDespesas( mes:number ) {

    let { sum } = await this.despesaRepository
      .createQueryBuilder("DESPESAS")
      .select("SUM(DESPESAS.valor)", "sum")
      .where(CriaWhere(mes))
      .getRawOne();

    return sum
  }

  async retornaTotalDespesasPagas(mes:number) {

    let { sum } = await this.despesaRepository
      .createQueryBuilder("DESPESAS")
      .select("SUM(DESPESAS.valor)", "sum")
      .where("DESPESAS.pago = true AND " + CriaWhere(mes))
      .getRawOne();

    return sum
  }

  async retornaTotalDespesasAbertas(mes:number) {

    let { sum } = await this.despesaRepository
      .createQueryBuilder("DESPESAS")
      .select("SUM(DESPESAS.valor)", "sum")
      .where("DESPESAS.pago = false AND " + CriaWhere(mes))
      .getRawOne();

    return sum
  }
}