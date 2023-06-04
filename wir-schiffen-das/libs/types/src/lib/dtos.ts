import { AlgorithmStateEnum, AuxiliaryPtoEnum, CoolingSystemEnum, DieselEngineEnum, EngineManagementSystemEnum, ExhaustSystemEnum, FuelSystemEnum, GearBoxOptions, MonitoringSystems, MountingSystemEnum, OilSystemEnum, PowerTransmission, StartingSystemEnum } from "./enums";

export interface CheckConfigurationDto {
    userID: string;
    diesel_engine: DieselEngineEnum;
    starting_system: StartingSystemEnum;
    auxiliary_pto: AuxiliaryPtoEnum;
    oil_system: OilSystemEnum;
    fuel_system: FuelSystemEnum;
    cooling_system: CoolingSystemEnum;
    exhaust_system: ExhaustSystemEnum;
    mounting_system: MountingSystemEnum;
    engine_management_system: EngineManagementSystemEnum;
    monitoring_system: MonitoringSystems;
    power_transmission: PowerTransmission;
    gear_box_option: GearBoxOptions;
}

export interface CheckAlgorithmStateDto {
    userID: string;
}

export interface ReturnAlgorithmStateDto {
    userID: string;
    algorithmState: AlgorithmStateEnum;
    
    
}

export interface ValidationMotor {
    starting_system: StartingSystemEnum;
}

export interface CreateAlgorithmStateDto {
    userId: string;
}
