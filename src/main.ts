import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  await app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RABBITMQ_HOST_URL')],
      queue: configService.get('RABBITMQ_AUTH_QUEUE_NAME'),
      queueOptions: {
        durable: true,
      },
    },
  } as RmqOptions);

  await app.startAllMicroservicesAsync();
}
bootstrap();
