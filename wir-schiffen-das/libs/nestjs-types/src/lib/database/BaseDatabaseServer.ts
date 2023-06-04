import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AlgorithmState, AlgorithmStateDocument } from '@wir-schiffen-das/nestjs-types';
import { CreateAlgorithmStateDto, MicroserviceAddressEnum } from '@wir-schiffen-das/types';
import { Model } from 'mongoose';

@Injectable()
export class EngineService {

    constructor( @InjectModel(AlgorithmState.name) private algorithmState: Model<AlgorithmStateDocument>, private httpService: HttpService) {
    }

    async create(createAlgorithmStateDto: CreateAlgorithmStateDto): Promise<AlgorithmStateDocument> {
        const createdAlgorithmState = new this.algorithmState(createAlgorithmStateDto);
        return createdAlgorithmState.save();
    }

    async load(id: string): Promise<AlgorithmStateDocument> {
        return this.algorithmState.findById(id).exec();
    }

    async update(id: string, createAlgorithmStateDto: CreateAlgorithmStateDto): Promise<AlgorithmStateDocument> {
        return this.algorithmState.findByIdAndUpdate(id, createAlgorithmStateDto, { new: true }).exec();
    }

}
