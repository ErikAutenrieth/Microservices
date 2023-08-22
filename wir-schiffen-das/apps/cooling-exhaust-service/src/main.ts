/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {Transport} from "@nestjs/microservices";
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Access environment variables using the ConfigService
  const configService = app.get(ConfigService);
  const BROKER_ADDRESS = configService.get<string>('BROKER_ADDRESS');

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'cooling-service',
        brokers: [BROKER_ADDRESS],
      },
      consumer: {
        groupId: 'cooling-service'
      }
    }
  });
  const globalPrefix = 'api';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  await app.startAllMicroservices();
  const port = process.env.PORT || 3020;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
