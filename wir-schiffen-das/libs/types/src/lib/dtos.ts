import {IS_UUID, IsEnum, IsOptional, IsString, IsUUID} from 'class-validator';
import {
  AlgorithmStateEnum,
  AuxiliaryPtoEnum,
  CoolingSystemEnum,
  DieselEngineEnum,
  EngineManagementSystemEnum,
  ExhaustSystemEnum,
  FuelSystemEnum,
  GearBoxOptions,
  MonitoringSystems,
  MountingSystemEnum,
  OilSystemEnum,
  PowerTransmission,
  StartingSystemEnum
} from "./enums";

export class ConfigurationDatabaseDto {

  @IsEnum(DieselEngineEnum)
  diesel_engine!: DieselEngineEnum;

  @IsEnum(StartingSystemEnum)
  starting_system!: StartingSystemEnum;

  @IsEnum(AuxiliaryPtoEnum)
  auxiliary_pto!: AuxiliaryPtoEnum;

  @IsEnum(OilSystemEnum)
  oil_system!: OilSystemEnum;

  @IsEnum(FuelSystemEnum)
  fuel_system!: FuelSystemEnum;

  @IsEnum(CoolingSystemEnum)
  cooling_system!: CoolingSystemEnum;

  @IsEnum(ExhaustSystemEnum)
  exhaust_system!: ExhaustSystemEnum;

  @IsEnum(MountingSystemEnum)
  mounting_system!: MountingSystemEnum;

  @IsEnum(EngineManagementSystemEnum)
  engine_management_system!: EngineManagementSystemEnum;

  @IsEnum(MonitoringSystems)
  monitoring_system!: MonitoringSystems;

  @IsEnum(PowerTransmission)
  power_transmission!: PowerTransmission;

  @IsEnum(GearBoxOptions)
  gear_box_option!: GearBoxOptions;
}

export class CheckConfigurationDto extends ConfigurationDatabaseDto {
  @IsUUID(4)
  userID!: string;
}

export class CheckAlgorithmStateDto {
  @IsUUID(4)
  userID!: string;
}

export class ReturnAlgorithmStateDto {
  @IsUUID(4)
  userID!: string;

  @IsEnum(AlgorithmStateEnum)
  algorithmState!: AlgorithmStateEnum;

  incompatibleComponents?: (DieselEngineEnum | StartingSystemEnum | AuxiliaryPtoEnum | OilSystemEnum |
    FuelSystemEnum | CoolingSystemEnum | ExhaustSystemEnum | MountingSystemEnum |
    EngineManagementSystemEnum | MonitoringSystems | PowerTransmission | GearBoxOptions)[];
}

export class ValidationMotor {

  @IsEnum(StartingSystemEnum)
  starting_system!: StartingSystemEnum;
}

export class CreateAlgorithmStateDto {

  @IsUUID(4)
  userId!: string;

  configuration!: ConfigurationDatabaseDto;
}

export class ConfigurationValidationInitDto {

  @IsUUID(4)
  userId!: string;

  @IsString()
  dbId!: string;
}

export class InitializeAlgorithmMicroserviceDto extends CreateAlgorithmStateDto {
  @IsString()
  dbId!: string;
}

export interface UpdateAlgorithmStateDto {
  ResultState?: AlgorithmStateEnum;
  userId?: string;
  auxilleryMountingState?: AlgorithmStateEnum;
  controlTransmissionState?: AlgorithmStateEnum;
  coolingExhaustState?: AlgorithmStateEnum;
  engineState?: AlgorithmStateEnum;
  incompactibleConfigurations?: any[];
}

export class UpdateAlgorithmStateDtoClass {
  @IsEnum(AlgorithmStateEnum)
  ResultState!: AlgorithmStateEnum;

  @IsString()
  userId!: string;

  @IsEnum(AlgorithmStateEnum)
  auxilleryMountingState!: AlgorithmStateEnum;

  @IsEnum(AlgorithmStateEnum)
  controlTransmissionState!: AlgorithmStateEnum;

  @IsEnum(AlgorithmStateEnum)
  coolingExhaustState!: AlgorithmStateEnum;

  @IsEnum(AlgorithmStateEnum)
  engineState!: AlgorithmStateEnum;

  @IsOptional()
  incompactibleConfigurations?: any[];
}


