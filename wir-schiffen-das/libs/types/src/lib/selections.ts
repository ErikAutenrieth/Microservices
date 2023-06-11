import { select_interface } from "@wir-schiffen-das/types";
import {
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
} from "@wir-schiffen-das/types";

export const diesel_engines: select_interface[] = [
  { value: DieselEngineEnum.V10, viewValue: '10V' },
  { value: DieselEngineEnum.V12, viewValue: '12V' },
  { value: DieselEngineEnum.V16, viewValue: '16V' }
];

export const starting_systems: select_interface[] = [
  { value: StartingSystemEnum.AirStarter, viewValue: 'Air Starter' },
  { value: StartingSystemEnum.ElectricStarter, viewValue: 'Electric Starter' },
  { value: StartingSystemEnum.HydraulicStarter, viewValue: 'Hydraulic Starter' },
  { value: StartingSystemEnum.PneumaticStarter, viewValue: 'Pneumatic Starter' },
  { value: StartingSystemEnum.Other, viewValue: 'Other' }
];

export const auxiliary_ptos: select_interface[] = [
  { value: AuxiliaryPtoEnum.Alternator, viewValue: 'Alternator' },
  { value: AuxiliaryPtoEnum.A140AOr190A, viewValue: 'A140A or 190A' },
  { value: AuxiliaryPtoEnum.BV2, viewValue: '2BV' },
  { value: AuxiliaryPtoEnum.Pole2, viewValue: '2 pole' },
  { value: AuxiliaryPtoEnum.Bilgepump, viewValue: 'Bilgepump' },
  { value: AuxiliaryPtoEnum.OnEnginePto, viewValue: 'On-engine PTOs' }
];

export const oil_systems: select_interface[] = [
  { value: OilSystemEnum.OilReplenishmentSystem, viewValue: 'Oil replenishment system' },
  { value: OilSystemEnum.DiverterValveForDuplexFilter, viewValue: 'Diverter valve for duplex filter' }
];

export const fuel_systems: select_interface[] = [
  { value: FuelSystemEnum.DuplexFuelPreFilter, viewValue: 'Duplex fuel pre-filter' },
  { value: FuelSystemEnum.DiverterValveForFuelFilter, viewValue: 'Diverter valve for fuel filter' },
  { value: FuelSystemEnum.MonitoringFuelLeakage, viewValue: 'Monitoring fuel leakage' }
];

export const cooling_systems: select_interface[] = [
  { value: CoolingSystemEnum.CoolantPreheatingSystem, viewValue: 'Coolant preheating System' },
  { value: CoolingSystemEnum.SeawaterGearboxPiping, viewValue: 'Seawater gearbox piping' }
];

export const exhaust_systems: select_interface[] = [
  { value: ExhaustSystemEnum.ExhaustBellowsDischargeRotable90, viewValue: '90 Exhaust bellows discharge rotable' },
  { value: ExhaustSystemEnum.ExhaustBellowsDischargeFixed90, viewValue: '90 Exhaust bellows discharge fixed' },
  { value: ExhaustSystemEnum.Other, viewValue: 'Other' }
];

export const mounting_systems: select_interface[] = [
  { value: MountingSystemEnum.ResilientMountsAtDrivingEnd, viewValue: 'Resilient mounts at driving end' },
  { value: MountingSystemEnum.ResilientMountsAtNonDrivingEnd, viewValue: 'Resilient mounts at non-driving end' },
  { value: MountingSystemEnum.Other, viewValue: 'Other' }
];

export const engine_management_systems: select_interface[] = [
  { value: EngineManagementSystemEnum.InComplianceWithCSR, viewValue: "In compliance with CSR" },
  { value: EngineManagementSystemEnum.InComplianceWithEPA, viewValue: "In compliance with EPA" },
  { value: EngineManagementSystemEnum.Other, viewValue: "Other" }
];

export const monitoring_systems: select_interface[] = [
  { value: MonitoringSystems.BlueVision, viewValue: "BlueVision" },
  { value: MonitoringSystems.BlueDrivePlusC, viewValue: "BlueDrive PlusC" }
];

export const power_transmissions: select_interface[] = [
  { value: PowerTransmission.TorsionallyResilientCoupling, viewValue: "Torsionally resilient coupling" },
  { value: PowerTransmission.VDrive, viewValue: "V-drive" },
  { value: PowerTransmission.CardanShaft, viewValue: "Cardan shaft" },
  { value: PowerTransmission.Other, viewValue: "Other" }
];


export const gear_box_options: select_interface[] = [
  { value: GearBoxOptions.ReverseReductionGearbox, viewValue: "Reverse reduction gearbox" },
  { value: GearBoxOptions.ElActuated, viewValue: "El.actuated" },
  { value: GearBoxOptions.GearboxMounts, viewValue: "Gearbox mounts" },
  { value: GearBoxOptions.TrollingModeForDeadSlowPropulsion, viewValue: "Trolling mode for dead-slow propulsion" },
  { value: GearBoxOptions.FreeAuxiliaryPTO, viewValue: "Free auxiliary PTO" }
];

export const components_failure = [
  DieselEngineEnum,
  StartingSystemEnum,
  AuxiliaryPtoEnum,
  OilSystemEnum,
  FuelSystemEnum,
  CoolingSystemEnum,
  ExhaustSystemEnum,
  MountingSystemEnum,
  EngineManagementSystemEnum,
  MonitoringSystems,
  PowerTransmission,
  GearBoxOptions
];