import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Categorias } from './categorias.entity';
import { CategoriasDTO } from './categorias.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('categorias')
@ApiTags('categorias')
@UseGuards(JwtAuthGuard)
export class CategoriasController {
  constructor(private readonly categoriaService: CategoriasService) {}

  @Get()
  async getAll(): Promise<Categorias[]> {
    return await this.categoriaService.retornaTodasCategorias();
  }

  @Post()
  async insereCategoria(@Body() despesa: CategoriasDTO): Promise<Categorias> {
    return this.categoriaService.insereCategoria(despesa);
  }

  @Delete('/:id')
  async deletaCategoria(
    @Param('id') id: number,
  ): Promise<{ deleted: boolean }> {
    return this.categoriaService.deletaCategoria(id);
  }

  @Put('/:id')
  async alteraDespesa(
    @Param('id') id: number,
    @Body() despesa: CategoriasDTO,
  ): Promise<Categorias> {
    return this.categoriaService.alteraCategoria(despesa);
  }
}
