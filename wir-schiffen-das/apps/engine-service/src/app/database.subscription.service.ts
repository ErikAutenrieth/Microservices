import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AlgorithmState, AlgorithmStateDocument } from '@wir-schiffen-das/nestjs-types';
import { AlgorithmStateEnum } from '@wir-schiffen-das/types';
import { ChangeStream } from 'mongodb';
import { Model } from 'mongoose';
import { BehaviorSubject, Observable, filter, fromEvent, tap,  } from 'rxjs';
@Injectable()
export class DatabaseSubscriptionService {

    private behaviorSubject : BehaviorSubject<any> = new BehaviorSubject<any>(null);
    
    private watchStream: ChangeStream<any, any>;
    // private stateChangeObservable = fromEvent(
    //     this.algorithmState.watch( 
    //         [],
    //         { fullDocument : "updateLookup" }
    //     ),
    //    "change"
    //   );
    
    
    

    constructor(@InjectModel(AlgorithmState.name) private algorithmState: Model<AlgorithmStateDocument>) {

        this.watchStream = this.algorithmState.watch( 
            [],
            { fullDocument : "updateLookup" }
        );
        
        // this.watchStream.on('change', this.mapToBehaviorSubject.bind(this));
        // to rxjs

        this.behaviorSubject
        .pipe( tap(change => console.log('change', change) ),
            
            filter(data => 
                data &&
                data["ResultState"] !== AlgorithmStateEnum.ready && 
                data["ResultState"] !== AlgorithmStateEnum.failed &&
                data["engineState"] === AlgorithmStateEnum.notStarted
            ) )
        .subscribe(change => this.handleStartAlgorithmChange(change));
        
        // this.watchStream.on('change', this.handleStartAlgorithmChange);
    }

    private mapToBehaviorSubject(change) {
        this.behaviorSubject.next(change);
    }

    private handleStartAlgorithmChange(change) {

        console.log('change', change);
        const data = change.fullDocument;
        console.log('data', data);
        console.log('userID', data.userId);
        console.log('ResultState', data.ResultState);
        // Add additional logic to handle changes in the AlgorithmState collection
    }

}
