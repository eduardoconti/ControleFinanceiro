import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule} from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true } );
  const APP_NAME = 'Controle Financeiro'
  const APP_VERSION = process.env.npm_package_version;

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
