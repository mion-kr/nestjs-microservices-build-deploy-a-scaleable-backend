import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // Add class validation pipe
  app.useLogger(app.get(Logger)); // Add nestjs-pino logger

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();