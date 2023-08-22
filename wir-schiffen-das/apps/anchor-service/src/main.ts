/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Access environment variables using the ConfigService
  const configService = app.get(ConfigService);
  const BROKER_ADDRESS = configService.get<string>('BROKER_ADDRESS');

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'anchor-service',
        brokers: [BROKER_ADDRESS],
      },
      consumer: {
        groupId: 'anchor-service'
    }
  }
  } as MicroserviceOptions );

  app.enableCors();
  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
