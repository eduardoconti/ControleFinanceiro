import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Home } from './dto/home.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Home {
    return this.appService.getHello();
  }

  @Get('calc')
  getCalc() {
    var exec = require('child_process').exec;
    exec('calc');
  }
}
