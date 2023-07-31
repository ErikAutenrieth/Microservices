import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import { DatabaseSubscriptionService } from './database.subscription.service';
import { AlgorithmState, AlgorithmStateDocument, AlgorithmStateSchema, BaseDatabaseServer, ConfigurationDatabaseSchema } from '@wir-schiffen-das/nestjs-types';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // Import configuration module and set up MongoDB connection
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_ATLAS_AZURE_CONNECTION_KEY),

    // Define Mongoose schemas for 'ConfigurationDatabase' and 'AlgorithmState' collections
    MongooseModule.forFeature([{ name: 'ConfigurationDatabase', schema: ConfigurationDatabaseSchema },
                                      { name: 'AlgorithmState', schema: AlgorithmStateSchema }]),

    // Define Mongoose schema for 'AlgorithmState' collection with pre-update hook
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
     // Define Kafka client for communication with the database service
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'engine-service',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'engine-service',
          }
        }
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, BaseDatabaseServer],

})
export class AppModule { }
