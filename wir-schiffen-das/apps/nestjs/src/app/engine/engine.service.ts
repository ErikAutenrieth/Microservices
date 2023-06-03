import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AlgorithmState, AlgorithmStateDocument } from '@wir-schiffen-das/nestjs-types';
import { CreateAlgorithmStateDto } from '@wir-schiffen-das/types';
import { Model } from 'mongoose';

@Injectable()
export class EngineService {

    constructor( @InjectModel(AlgorithmState.name) private algorithmState: Model<AlgorithmStateDocument>) {
    }

    async create(createAlgorithmStateDto: CreateAlgorithmStateDto): Promise<AlgorithmStateDocument> {
        const createdAlgorithmState = new this.algorithmState(createAlgorithmStateDto);
        return createdAlgorithmState.save();
      }
 
      
}
