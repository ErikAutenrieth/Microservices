import { Module } from '@nestjs/common';
import { EngineController } from './engine.controller';
import { EngineService } from './engine.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { AlgorithmState, AlgorithmStateSchema } from '@wir-schiffen-das/nestjs-types';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: AlgorithmState.name, schema: AlgorithmStateSchema }]),
        HttpModule
    ],
    controllers: [EngineController],
    providers: [EngineService],
})
export class EngineModule { }
