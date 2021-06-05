import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { transferenciasProviders } from './transferencias.providers';
import { TransferenciaService } from './transferencias.service';
import { TransferenciasController } from './transferencias.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TransferenciasController],
  providers: [...transferenciasProviders, TransferenciaService],
})
export class TransferenciasModule {}
