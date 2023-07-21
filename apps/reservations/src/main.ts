import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // Add class validation pipe
  app.useLogger(app.get(Logger)); // Add nestjs-pino logger

  await app.listen(3000);
}
bootstrap();
