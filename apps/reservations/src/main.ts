import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as CookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);

  app.use(CookieParser()); // 쿠키가 있는 요청은 이 미들웨어를 통해 쿠키를 파싱합니다.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // Add class validation pipe
  app.useLogger(app.get(Logger)); // Add nestjs-pino logger

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
