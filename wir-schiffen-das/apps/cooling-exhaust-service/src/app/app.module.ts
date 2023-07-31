import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AlgorithmState, AlgorithmStateDocument, AlgorithmStateSchema, BaseDatabaseServer, ConfigurationDatabaseSchema } from '@wir-schiffen-das/nestjs-types';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_ATLAS_AZURE_CONNECTION_KEY),
    MongooseModule.forFeature([{ name: 'ConfigurationDatabase', schema: ConfigurationDatabaseSchema }, { name: 'AlgorithmState', schema: AlgorithmStateSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: AlgorithmState.name,
        useFactory: () => {
          const schema = AlgorithmStateSchema;
          schema.pre<AlgorithmStateDocument>('updateOne', function (this: AlgorithmStateDocument) {
            console.log("updateOne");
            this.updateLastUpdated();
          });
          return schema;
        }
      }
    ]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'cooling-service',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'cooling-service',
          }
        }
      },
    ]),

  ],
  controllers: [AppController],
  providers: [AppService, BaseDatabaseServer],

})
export class AppModule { }
