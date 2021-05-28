import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DespesasModule } from './despesas/despesas.module';
import { ReceitasModule } from './receitas/receitas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { CarteirasModule } from './carteiras/carteiras.module';
import { TransferenciasModule } from './transferencias/transferencias.module'
import { ConfigModule } from '@nestjs/config';


@Module({
  imports:[DespesasModule, ReceitasModule, CategoriasModule, CarteirasModule,TransferenciasModule,ConfigModule.forRoot() ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
