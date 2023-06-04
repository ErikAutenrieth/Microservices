export enum DieselEngineEnum {
  V10 = '10V',
  V12 = '12V',
  V16 = '16V'
}

export enum AuxiliaryPtoEnum {
  Alternator = 'Alternator',
  A140AOr190A = 'A140A or 190A',
  BV2 = '2BV',
  Pole2 = '2 pole',
  Bilgepump = 'Bilgepump',
  OnEnginePto = 'On-engine PTOs'
}

export enum StartingSystemEnum {
  AirStarter = 'Air Starter',
  ElectricStarter = 'Electric Starter',
  HydraulicStarter = 'Hydraulic Starter',
  PneumaticStarter = 'Pneumatic Starter',
  Other = 'Other'
}

export enum OilSystemEnum {
  OilReplenishmentSystem = 'Oil replenishment system',
  DiverterValveForDuplexFilter = 'Diverter valve for duplex filter'
}

export enum FuelSystemEnum {
  DuplexFuelPreFilter = 'Duplex fuel pre-filter',
  DiverterValveForFuelFilter = 'Diverter valve for fuel filter',
  MonitoringFuelLeakage = 'Monitoring fuel leakage'
}

export enum CoolingSystemEnum {
  CoolantPreheatingSystem = 'Coolant preheating System',
  SeawaterGearboxPiping = 'Seawater gearbox piping'
}

export enum ExhaustSystemEnum {
  ExhaustBellowsDischargeRotable90 = '90 Exhaust bellows discharge rotable',
  ExhaustBellowsDischargeFixed90 = '90 Exhaust bellows discharge fixed',
  Other = 'Other'
}

export enum MountingSystemEnum {
  ResilientMountsAtDrivingEnd = 'Resilient mounts at driving end',
  ResilientMountsAtNonDrivingEnd = 'Resilient mounts at non-driving end',
  Other = 'Other'
}

export enum EngineManagementSystemEnum {
  InComplianceWithCSR = "In compliance with CSR",
  InComplianceWithEPA = "In compliance with EPA",
  Other = 'Other'
}

export enum MonitoringSystems {
  BlueVision = "BlueVision",
  BlueDrivePlusC = "BlueDrive PlusC"
}

export enum PowerTransmission {
  TorsionallyResilientCoupling = "Torsionally resilient coupling",
  VDrive = "V-drive",
  CardanShaft = "Cardan shaft",
  Other = 'Other'
}

export enum GearBoxOptions {
  ReverseReductionGearbox = "Reverse reduction gearbox",
  ElActuated = "El.actuated",
  GearboxMounts = "Gearbox mounts",
  TrollingModeForDeadSlowPropulsion = "Trolling mode for dead-slow propulsion",
  FreeAuxiliaryPTO = "Free auxiliary PTO"
}

export enum AlgorithmStateEnum {
  running = 'running',
  failed = 'failed',
  ready = 'ready',
  notStarted = 'not started'
}

