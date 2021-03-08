import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { TransferenciasDTO } from './transferencias.dto'
import { Transferencias } from './transferencias.entity'
import { Repository } from 'typeorm';

const select = [
    'transferencias.id',
    'transferencias.descricao',
    'transferencias.valor',
    'transferencias.pago',
    'transferencias.dataTransferencia',
    'carteiraOrigem',
    'carteiraDestino'

];

function CriaWhereMes(mes: number) {
    return typeof mes === 'undefined' || mes === 0
        ? 'TRUE'
        : 'MONTH(transferencias.dataTransferencia)=' + String(mes);
}

function CriaWherePago(pago: boolean) {
    return typeof pago === 'undefined'
        ? 'TRUE'
        : 'transferencias.pago=' + pago
}

function CriaWhereAno(ano: number) {
    return (typeof ano == 'undefined' || ano === 0)
        ? 'TRUE'
        : 'YEAR(transferencias.dataTransferencia)=' + String(ano);
}
@Injectable()
export class TransferenciaService {
    constructor(
        @Inject('TRANSFERENCIAS')
        private transferenciaRepository: Repository<Transferencias>,
    ) { }
    async retornaTodas(ano: number, mes: number, pago: boolean): Promise<Transferencias[]> {
        !mes ? (mes = 0) : (mes = mes);
        !ano ? (ano = 0) : (ano = ano);
    
        let transferencias = await this.transferenciaRepository
          .createQueryBuilder('transferencias')
          .select(select)
          .innerJoin('transferencias.carteiraOrigem', 'carteiraOrigem')
          .innerJoin('transferencias.carteiraDestino', 'carteiraDestino')
          .orderBy('transferencias.valor', 'DESC')
          .where(CriaWhereAno(ano))
          .andWhere(CriaWhereMes(mes))
          .andWhere(CriaWherePago(pago))
          .getMany();
        return transferencias;
      }
    
    async getOne(id: number): Promise<Transferencias> {
        return this.transferenciaRepository.findOneOrFail(
            { id },
            { relations: ['carteiraOrigem', 'carteiraDestino'] },
        );
    }

    async insereTransferencia(transferencia: TransferenciasDTO): Promise<Transferencias> {
        if (transferencia.descricao.length < 1) {
            throw new BadRequestException('Descrição deve ter ao menos 1 caractere');
        }
        if (transferencia.valor < 0) {
            throw new BadRequestException('Valor deve ser >= 0');
        }
        const newTransferencias = this.transferenciaRepository.create(transferencia);
        await this.transferenciaRepository.save(newTransferencias);
        return newTransferencias;
    }

    async alteraTransferencia(transferencia: TransferenciasDTO): Promise<Transferencias> {
        const { id } = transferencia;
        await this.transferenciaRepository.update({ id }, transferencia);
        return this.getOne(id);
    }

    async alteraFlagPago(transferencia) {
        const { id } = transferencia;
        await this.transferenciaRepository.update({ id }, transferencia);
        return this.getOne(id);
    }

    async deletaTransferencia(
        id: number,
    ): Promise<{ deleted: boolean; message?: string }> {

        let data
        try {
            await this.transferenciaRepository.delete({ id });
            data = { deleted: true };
        } catch (err) {
            data = { deleted: false, message: err.message };
        }

        return data
    }
}
