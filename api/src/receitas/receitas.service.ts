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
  "receitas.pagamento",
  "carteira"
]

function CriaWhere( mes ){
  if(mes===0){
    return "TRUE"
  }else {
    return "MONTH(receitas.pagamento)=" + String(mes)
  }
}

@Injectable()
export class ReceitaService {
  constructor(
    @Inject('RECEITAS')
    private receitaRepository: Repository<Receitas>,
  ) { }

  async retornaTodasReceitas(mes:number) {
    let receitas = await this.receitaRepository
      .createQueryBuilder("receitas")
      .select(select)
      .innerJoin("receitas.carteira", "carteira")
      .where(CriaWhere( mes ))
      .orderBy("receitas.valor", 'DESC')
      .getMany();

    return receitas
  }

  async retornaReceitasPagas(mes:number) {
    let receitas = await this.receitaRepository
      .createQueryBuilder("receitas")
      .select(select)
      .innerJoin("receitas.carteira", "carteira")
      .where("receitas.pago=true AND " + CriaWhere( mes ) )
      .orderBy("receitas.valor", 'DESC')
      .getMany();

    return receitas
  }

  async retornaReceitasEmAberto( mes:number) {
    let receitas = await this.receitaRepository
      .createQueryBuilder("receitas")
      .select(select)
      .innerJoin("receitas.carteira", "carteira")
      .where("receitas.pago=false AND " + CriaWhere( mes ))
      .orderBy("receitas.valor", 'DESC')
      .getMany();

    return receitas
  }
  async retornaValorReceitasAgrupadasPorCarteira( mes:number) {

    let receitas = await this.receitaRepository
      .createQueryBuilder("receitas")
      .select([
        "SUM(receitas.valor) valor",
        "carteira.descricao descricao",
        "carteira.id id"
      ])
      .innerJoin("receitas.carteira", "carteira")
      .where(CriaWhere(mes))
      .groupBy("receitas.carteira")
      .orderBy("valor", 'DESC')
      .getRawMany();

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

  async alteraFlagPago(receita): Promise<{ id: number, pago: boolean }> {
    const { id } = receita;
    await this.receitaRepository.update({ id }, receita);
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

  async retornaTotalReceitas( mes:number) {

    let { sum } = await this.receitaRepository
      .createQueryBuilder("RECEITAS")
      .select("SUM(RECEITAS.valor)", "sum")
      .where(CriaWhere( mes ))
      .getRawOne();

    return sum
  }

  async retornaTotalReceitasPagas(mes:number) {

    let { sum } = await this.receitaRepository
      .createQueryBuilder("RECEITAS")
      .select("SUM(RECEITAS.valor)", "sum")
      .where("RECEITAS.pago = true AND " + CriaWhere( mes ))
      .getRawOne();

    return sum
  }

  async retornaTotalReceitasAbertas(mes:number) {

    let { sum } = await this.receitaRepository
      .createQueryBuilder("RECEITAS")
      .select("SUM(RECEITAS.valor)", "sum")
      .where("RECEITAS.pago = false AND " + CriaWhere( mes ))
      .getRawOne();

    return sum
  }
}