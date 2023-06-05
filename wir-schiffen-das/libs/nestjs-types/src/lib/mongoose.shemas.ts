
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AlgorithmStateEnum, CheckConfigurationDto, ConfigurationDatabaseDto } from '@wir-schiffen-das/types';
import { DieselEngineEnum, StartingSystemEnum, AuxiliaryPtoEnum, OilSystemEnum, FuelSystemEnum, CoolingSystemEnum, ExhaustSystemEnum, MountingSystemEnum, EngineManagementSystemEnum, MonitoringSystems, PowerTransmission, GearBoxOptions } from '@wir-schiffen-das/types';
import { HydratedDocument } from 'mongoose';

@Schema()
export class ConfigurationDatabaseSchema {
    @Prop({ type: String, enum: DieselEngineEnum })
    diesel_engine!: DieselEngineEnum;

    @Prop({ type: String, enum: StartingSystemEnum })
    starting_system!: StartingSystemEnum;

    @Prop({ type: String, enum: AuxiliaryPtoEnum })
    auxiliary_pto!: AuxiliaryPtoEnum;

    @Prop({ type: String, enum: OilSystemEnum })
    oil_system!: OilSystemEnum;

    @Prop({ type: String, enum: FuelSystemEnum })
    fuel_system!: FuelSystemEnum;

    @Prop({ type: String, enum: CoolingSystemEnum })
    cooling_system!: CoolingSystemEnum;

    @Prop({ type: String, enum: ExhaustSystemEnum })
    exhaust_system!: ExhaustSystemEnum;

    @Prop({ type: String, enum: MountingSystemEnum })
    mounting_system!: MountingSystemEnum;

    @Prop({ type: String, enum: EngineManagementSystemEnum })
    engine_management_system!: EngineManagementSystemEnum;

    @Prop({ type: String, enum: MonitoringSystems })
    monitoring_system!: MonitoringSystems;

    @Prop({ type: String, enum: PowerTransmission })
    power_transmission!: PowerTransmission;

    @Prop({ type: String, enum: GearBoxOptions })
    gear_box_option!: GearBoxOptions;

};


export type AlgorithmStateDocument = HydratedDocument<AlgorithmState>;

@Schema()
export class AlgorithmState {
    @Prop({ type: String, default: AlgorithmStateEnum.notStarted })
    ResultState: AlgorithmStateEnum = AlgorithmStateEnum.notStarted;

    @Prop()
    userId!: string;

    @Prop({ default: Date.now })
    created: Date = new Date();

    @Prop({type: ConfigurationDatabaseSchema })
    configuration!: ConfigurationDatabaseDto;

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

    @Prop({ type: [] })
    incompactibleConfigurations: [] = [];

    // Add a method to update the lastUpdated property
    updateLastUpdated() {
        this.lastUpdated = new Date();
    }
}


export const AlgorithmStateSchema = SchemaFactory.createForClass(AlgorithmState);

