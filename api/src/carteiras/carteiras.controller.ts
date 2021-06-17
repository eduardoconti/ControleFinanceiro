import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Carteiras } from './entity/carteiras.entity';
import { CarteirasDTO } from './dto/carteiras.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CarteirasService } from './service/carteiras.service';
@Controller('carteiras')
@ApiTags('carteiras')
@UseGuards(JwtAuthGuard)
export class CarteirasController {
  constructor(private readonly carteiraService: CarteirasService) {}

  @Get()
  async getAll(): Promise<Carteiras[]> {
    return await this.carteiraService.retornaTodasCarteiras();
  }

  @Post()
  async insereCarteira(@Body() despesa: CarteirasDTO): Promise<Carteiras> {
    return this.carteiraService.insereCarteira(despesa);
  }

  @Delete('/:id')
  async deletaCarteira(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return this.carteiraService.deletaCarteira(id);
  }

  @Put('/:id')
  async alteraDespesa(
    @Param('id') id: number,
    @Body() despesa: CarteirasDTO,
  ): Promise<Carteiras> {
    return this.carteiraService.alteraCarteira(despesa);
  }
}
