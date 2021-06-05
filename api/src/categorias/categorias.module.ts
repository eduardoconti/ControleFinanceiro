import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { categoriasProviders } from './categorias.providers';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
@Module({
  imports: [DatabaseModule],
  controllers: [CategoriasController],
  providers: [...categoriasProviders, CategoriasService],
})
export class CategoriasModule {}
