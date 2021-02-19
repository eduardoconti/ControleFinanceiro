import { Controller, Get } from '@nestjs/common';
import { CategoriasService } from './categorias.service'
import { Categorias } from './categorias.entity'
import { CategoriasDTO } from './categorias.dto'
@Controller('categorias')
export class CategoriasController {

    constructor(private readonly despesaService: CategoriasService) { }

    @Get()
    async getAll(): Promise<Categorias[]> {
        return await this.despesaService.retornaTodasCategorias();
    }
}
