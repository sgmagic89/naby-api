import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('NabyIn API')
  .setDescription('APIs for NabyIn App')
  .setVersion('1.0')
  .addTag('users')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  await app.listen(port);
  Logger.log(`~ Application is running on: ${await app.getUrl()}`);
}
bootstrap();
