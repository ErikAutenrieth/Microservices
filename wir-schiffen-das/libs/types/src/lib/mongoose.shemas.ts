
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AlgorithmStateEnum } from './enums';


export type AlgorithmStateDocument = HydratedDocument<AlgorithmState>;

@Schema()
export class AlgorithmState {
    @Prop({ enum: AlgorithmStateEnum })
    state: AlgorithmStateEnum = AlgorithmStateEnum.notStarted;

    @Prop()
    userId!: string;

    @Prop()
    created: Date = new Date();

    @Prop()
    lastUpdated: Date = new Date();

    // Add a method to update the lastUpdated property
    updateLastUpdated() {
        this.lastUpdated = new Date();
    }
}


export const AlgorithmStateSchema = SchemaFactory.createForClass(AlgorithmState);

