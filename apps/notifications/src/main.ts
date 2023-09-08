import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  // 독립형 마이크로서비스로 구축 합니다.
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);

  const port = configService.get('PORT');
  console.log(`port: ${port}`);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('PORT'),
    },
  });

  app.useLogger(app.get(Logger)); // Add nestjs-pino logger

  await app.startAllMicroservices();
}
bootstrap();
