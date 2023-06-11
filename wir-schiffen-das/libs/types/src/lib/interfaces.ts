import {StartingSystemEnum} from "@wir-schiffen-das/types";
import {
  AlgorithmStateEnum,
  AuxiliaryPtoEnum,
  CheckConfigurationDto,
  CoolingSystemEnum,
  DieselEngineEnum,
  EngineManagementSystemEnum,
  ExhaustSystemEnum,
  FuelSystemEnum,
  GearBoxOptions,
  MicroserviceAddressEnum,
  MonitoringSystems,
  MountingSystemEnum,
  OilSystemEnum,
  PowerTransmission,
  ReturnAlgorithmStateDto,
} from "@wir-schiffen-das/types";


export interface select_interface {
    value: string | StartingSystemEnum;
    viewValue: string;
  }


