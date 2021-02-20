import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { categoriasProviders } from './carteiras.providers';
import { CarteirasService } from './carteiras.service';
import { CarteirasController } from './carteiras.controller'
@Module({
    imports: [DatabaseModule],
    controllers: [CarteirasController],
    providers: [
        ...categoriasProviders,
        CarteirasService,
    ],
})

export class CarteirasModule { }
