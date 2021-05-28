import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule} from '@nestjs/swagger'
import * as helmet from 'helmet';
import { HttpExceptionFilter } from './shared/exceptions/http-exception.filter';
import { ValidationPipe } from './shared/pipes/validation.pipe';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true } );

  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const APP_NAME = 'Controle Financeiro'
  const APP_VERSION = '1.0';

  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription('API controle financeiro')
    .setVersion(APP_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3001);
}
bootstrap();
