import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DespesasController } from './despesas/despesas.controller';
import { DespesasModule } from './despesas/despesas.module';
import { DespesaService } from './despesas/despesas.service'

@Module({
  imports:[DespesasModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
