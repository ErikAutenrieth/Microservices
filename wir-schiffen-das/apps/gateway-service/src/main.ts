/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true });

  // Access environment variables using the ConfigService
  const configService = app.get(ConfigService);
  const BROKER_ADDRESS = configService.get<string>('BROKER_ADDRESS');
  
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'gateway-service',
        brokers: [BROKER_ADDRESS],
      },
      consumer: {
        groupId: 'gateway-service'
      }
    }
  });
  const globalPrefix = 'api';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  const port = process.env.PORT || 3060;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
