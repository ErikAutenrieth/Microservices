import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import {
  AlgorithmState,
  AlgorithmStateSchema,
} from '@wir-schiffen-das/nestjs-types';
import { AnchorController } from './anchor.controller';
import { AnchorService } from './anchor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AlgorithmState.name, schema: AlgorithmStateSchema },
    ]),
    HttpModule,
  ],
  controllers: [AnchorController],
  providers: [AnchorService],
})
export class AnchorModule {}
