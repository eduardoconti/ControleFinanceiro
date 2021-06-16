import { ClassSerializerInterceptor, Controller, Get, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AppService } from './app.service';
import { Home } from './dto/home.dto';
import { v4 as uuidv4 } from 'uuid';
import { LoginDTO } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private authService: AuthService) {}

  @Get()
  getHello(): Home {
    return this.appService.getHello();
  }

  @Get('calc')
  getCalc() {
    var exec = require('child_process').exec;
    exec('calc');
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Request() req ){
    return this.authService.login(req.user);
  }

  @Get('uuid')
  getUuid(): string{
    return uuidv4();
  }
}
