
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AlgorithmStateEnum, CheckConfigurationDto } from '@wir-schiffen-das/types';
import { HydratedDocument } from 'mongoose';



export type AlgorithmStateDocument = HydratedDocument<AlgorithmState>;

@Schema()
export class AlgorithmState {
    @Prop({ type: String, default: AlgorithmStateEnum.notStarted })
    ResultState: AlgorithmStateEnum = AlgorithmStateEnum.notStarted;

    @Prop()
    userId!: string;

    @Prop({ default: Date.now })
    created: Date = new Date();

    @Prop()
    configuration!: CheckConfigurationDto;

    @Prop({ default: Date.now })
    lastUpdated: Date = new Date();

    @Prop({ type: String, default: AlgorithmStateEnum.notStarted })
    auxilleryMountingState: AlgorithmStateEnum = AlgorithmStateEnum.notStarted;

    @Prop({ type: String, default: AlgorithmStateEnum.notStarted })
    controlTransmissionState: AlgorithmStateEnum = AlgorithmStateEnum.notStarted;

    @Prop({ type: String, default: AlgorithmStateEnum.notStarted })
    coolingExhaustState: AlgorithmStateEnum = AlgorithmStateEnum.notStarted;
    
    @Prop({ type: String, default: AlgorithmStateEnum.notStarted })
    engineState: AlgorithmStateEnum = AlgorithmStateEnum.notStarted;

    // Add a method to update the lastUpdated property
    updateLastUpdated() {
        this.lastUpdated = new Date();
    }
}


export const AlgorithmStateSchema = SchemaFactory.createForClass(AlgorithmState);

