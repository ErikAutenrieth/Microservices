import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import {
  AlgorithmStateSchema,
  BaseDatabaseServer,
  ConfigurationDatabaseSchema,
} from '@wir-schiffen-das/nestjs-types';
import { AnchorController } from './anchor.controller';
import { AnchorService } from './anchor.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ConfigurationDatabase', schema: ConfigurationDatabaseSchema }, { name: 'AlgorithmState', schema: AlgorithmStateSchema }]),
    /* MongooseModule.forFeature([
      { name: AlgorithmState.name, schema: AlgorithmStateSchema },
    ]), */

    ClientsModule.register([
      {
        name: 'ANCHOR_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'anchor-service',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'anchor-service'
          }
        }
      },
    ]),
    HttpModule,
  ],
  controllers: [AnchorController],
  providers: [AnchorService, BaseDatabaseServer],
})
export class AnchorModule { }
