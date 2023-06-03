import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AlgorithmState, AlgorithmStateDocument } from '@wir-schiffen-das/nestjs-types';
import { AlgorithmStateEnum } from '@wir-schiffen-das/types';
import { Model } from 'mongoose';
import { BehaviorSubject, Observable, filter, fromEvent, tap } from 'rxjs';
@Injectable()
export class DatabaseSubscriptionService {

    behaviorSubject = new BehaviorSubject<AlgorithmStateDocument>(null);
    
    private stateChangeObservable = fromEvent(
        this.algorithmState.watch(),
        'change',
      );
    
    
    

    constructor(@InjectModel(AlgorithmState.name) private algorithmState: Model<AlgorithmStateDocument>) {

        this.algorithmState.watch().on('change', this.handleStartAlgorithmChange);
        // to rxjs


        this.stateChangeObservable
        .pipe( tap(change => console.log('change', change) ),
            filter(data => 
                (data["ResultState"] !== AlgorithmStateEnum.ready && 
                data["ResultState"] !== AlgorithmStateEnum.failed) &&
                data["engineState"] === AlgorithmStateEnum.notStarted
            ) )
            .subscribe(change => this.handleStartAlgorithmChange(change));
    }


    private handleStartAlgorithmChange(change) {
        const data = change.fullDocument;
        console.log('data', data);
        console.log('userID', data.userId);
        console.log('ResultState', data.ResultState);
        // Add additional logic to handle changes in the AlgorithmState collection
    }

}
