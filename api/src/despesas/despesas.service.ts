import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Despesas } from './despesas.entity';
import { DespesasDTO } from './despesas.dto'
import { from } from 'rxjs';

@Injectable()
export class DespesaService {
  constructor(
    @Inject('DESPESAS')
    private despesaRepository: Repository<Despesas>,
  ) { }

  async retornaTodasDespesas(): Promise<Despesas[]> {
    return await this.despesaRepository.find();
  }
  async getOne(id: number): Promise<Despesas> {
    return this.despesaRepository.findOneOrFail({ id });
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

  async deletaDespesa(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.despesaRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async retornaDespesasPagas( ){
    return await from( this.despesaRepository.find({
      where:{
        pago: true,
      },
    } ) )
  }

  async retornaDespesasEmAberto( ){
    return from(this.despesaRepository.find({
      where: {
        pago: false,
      },
    }))
  }

  async retornaTotalDespesas(){

    let {sum}  = await this.despesaRepository
            .createQueryBuilder("DESPESAS")
            .select("SUM(DESPESAS.valor)", "sum")
            .getRawOne(); 

    return  sum
  }

  async retornaTotalDespesasPagas(){

    let {sum}  = await this.despesaRepository
            .createQueryBuilder("DESPESAS")
            .select("SUM(DESPESAS.valor)", "sum")
            .where("DESPESAS.pago = true")
            .getRawOne(); 

    return  sum
  }

  async retornaTotalDespesasAbertas(){

    let {sum}  = await this.despesaRepository
            .createQueryBuilder("DESPESAS")
            .select("SUM(DESPESAS.valor)", "sum")
            .where("DESPESAS.pago = false")
            .getRawOne(); 

    return  sum
  }
}