import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Receitas } from './receitas.entity';
import { ReceitasDTO } from './receitas.dto'
import { from } from 'rxjs';

@Injectable()
export class ReceitaService {
  constructor(
    @Inject('RECEITAS')
    private receitaRepository: Repository<Receitas>,
  ) { }

  async retornaTodasReceitas(): Promise<Receitas[]> {
    return await this.receitaRepository.find();
  }
  async getOne(id: number): Promise<Receitas> {
    return this.receitaRepository.findOneOrFail({ id });
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

  async deletaReceita(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.receitaRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async retornaReceitasPagas( ){
    return await from( this.receitaRepository.find({
      where:{
        pago: true,
      },
    } ) )
  }

  async retornaReceitasEmAberto( ){
    return from(this.receitaRepository.find({
      where: {
        pago: false,
      },
    }))
  }

  async retornaTotalReceitas(){

    let {sum}  = await this.receitaRepository
            .createQueryBuilder("RECEITAS")
            .select("SUM(RECEITAS.valor)", "sum")
            .getRawOne(); 

    return  sum
  }

  async retornaTotalReceitasPagas(){

    let {sum}  = await this.receitaRepository
            .createQueryBuilder("RECEITAS")
            .select("SUM(RECEITAS.valor)", "sum")
            .where("RECEITAS.pago = true")
            .getRawOne(); 

    return  sum
  }

  async retornaTotalReceitasAbertas(){

    let {sum}  = await this.receitaRepository
            .createQueryBuilder("RECEITAS")
            .select("SUM(RECEITAS.valor)", "sum")
            .where("RECEITAS.pago = false")
            .getRawOne(); 

    return  sum
  }
}