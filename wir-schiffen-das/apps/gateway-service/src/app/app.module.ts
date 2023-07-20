import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlgorithmStateSchema, BaseDatabaseServer, ConfigurationDatabaseSchema } from '@wir-schiffen-das/nestjs-types';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { WSGateway } from './app.ws.gateway';

@Module({
  
  imports: [HttpModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_ATLAS_AZURE_CONNECTION_KEY),
    MongooseModule.forFeature([{ name: 'ConfigurationDatabase', schema: ConfigurationDatabaseSchema }, { name: 'AlgorithmState', schema: AlgorithmStateSchema }]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            // clientId: 'engine',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'wir-schiffen-das',
          }
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, BaseDatabaseServer, WSGateway],
})
export class AppModule { }
