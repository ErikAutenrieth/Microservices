import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AlgorithmState, AlgorithmStateDocument, ConfigurationDatabase, ConfigurationDatabaseDocument, ConfigurationDatabaseSchema } from '@wir-schiffen-das/nestjs-types';
import { CreateAlgorithmStateDto, UpdateAlgorithmStateDto } from '@wir-schiffen-das/types';
import { Model } from 'mongoose';

@Injectable()
export class BaseDatabaseServer {

    constructor(@InjectModel(ConfigurationDatabase.name) private configurationDatabase: Model<ConfigurationDatabaseDocument>,
                @InjectModel(AlgorithmState.name) private algorithmState: Model<AlgorithmStateDocument>,
    ) {
    }

    async create(createAlgorithmStateDto: CreateAlgorithmStateDto): Promise<AlgorithmStateDocument> {
        const createdAlgorithmState = new this.algorithmState(createAlgorithmStateDto);
        return createdAlgorithmState.save();
    }

    async load(id: string): Promise<AlgorithmStateDocument | null> {
        return this.algorithmState.findById(id).exec();
    }

    async findByUserId(userId: string): Promise<AlgorithmStateDocument | null> {
        return this.algorithmState.findOne({ userId: userId }).sort({ created: -1 }).exec();
    }


    async update(id: string, updateAlgorithmState: UpdateAlgorithmStateDto): Promise<AlgorithmStateDocument | null> {
        return this.algorithmState.findByIdAndUpdate(id, updateAlgorithmState, { new: true }).exec();
    }

}
