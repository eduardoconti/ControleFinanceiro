import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { despesasProviders } from './despesas.providers';
import { DespesaService } from './despesas.service';
import { DespesasController } from './despesas.controller'

@Module({
  imports: [DatabaseModule],
  controllers:[DespesasController],
  providers: [
    ...despesasProviders,
    DespesaService,
  ],
})

export class DespesasModule {}