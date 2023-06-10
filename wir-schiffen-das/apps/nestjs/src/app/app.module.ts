import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EngineModule } from './engine/engine.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AlgorithmState, AlgorithmStateSchema } from '@wir-schiffen-das/nestjs-types';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_ATLAS_AZURE_CONNECTION_KEY),
    EngineModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
