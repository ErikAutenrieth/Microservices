import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AlgorithmState, AlgorithmStateDocument } from '@wir-schiffen-das/nestjs-types';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseSubscriptionService {

    constructor(@InjectModel(AlgorithmState.name) private algorithmState: Model<AlgorithmStateDocument>) {

        this.algorithmState.watch().on('change', this.handleStateChange);
    }


    private handleStateChange(change) {
        const data = change.fullDocument;
        console.log('data', data);
        console.log('userID', data.userId);
        console.log('ResultState', data.ResultState);
        // Add additional logic to handle changes in the AlgorithmState collection
    }

}
