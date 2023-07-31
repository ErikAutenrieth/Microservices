/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

// Connect the Microservice to the application, using Kafka as the transport mechanism
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(
    {
    transport: Transport.KAFKA,
    options: {
      client: {

        clientId: 'engine-service',  // Set the client ID for the Kafka client
        brokers: ['localhost:9092'], // Set the list of Kafka brokers to connect to
      },
      consumer: {
        groupId: 'engine-service'    // Set the group ID for the Kafka consumer
      }
    }
  } as MicroserviceOptions
  );
  const globalPrefix = 'api';

  // Enable Cross-Origin Resource Sharing (CORS) to allow requests from different domains
  app.enableCors();

  // Set a global prefix for all endpoints, in this case, '/api'
  app.setGlobalPrefix(globalPrefix);

  // Add a global validation pipe to validate input data before passing it to controllers
  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  const port = process.env.PORT || 3010;
  // Start the application and make it listen for incoming requests on the defined port
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
