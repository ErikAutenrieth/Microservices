import {Component} from "@angular/core";
import {CommonModule} from '@angular/common';
import {MatOptionModule, ThemePalette} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule} from '@angular/forms';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule, ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {
  AlgorithmStateEnum,
  AuxiliaryPtoEnum,
  CheckConfigurationDto,
  CoolingSystemEnum,
  DieselEngineEnum,
  EngineManagementSystemEnum,
  ExhaustSystemEnum,
  FuelSystemEnum,
  GearBoxOptions, MicroserviceAddressEnum,
  MonitoringSystems,
  MountingSystemEnum,
  OilSystemEnum,
  PowerTransmission,
  StartingSystemEnum
} from "@wir-schiffen-das/types";
import {EngineService} from "../../services/EngineService";
import {SessionService} from "../../services/SessionService";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

interface select_interface {
  value: string | StartingSystemEnum;
  viewValue: string;
}


const THUMBUP_ICON =
  ` <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
  `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
  `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>`;

const RED_CROSS_ICON =
  ` <svg xmlns="https://icons8.de/icon/T9nkeADgD3z6/cross-mark" width="24px" height="24px">

 </svg>`;


@Component({
  selector: 'wir-schiffen-das-home',
  standalone: true,
  imports: [CommonModule, MatOptionModule, MatSelectModule, MatInputModule, FormsModule, MatGridListModule, MatProgressBarModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: []
})


export class HomeComponent {

  private sessionID: string;

  constructor(private engineService: EngineService, private sessionService: SessionService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.sessionID = sessionService.getSessionId();
    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
    iconRegistry.addSvgIconLiteral('red-cross', sanitizer.bypassSecurityTrustHtml(RED_CROSS_ICON));
  }


  ngOnInit() {
    this.engineService.test();
  }

  // spinner props
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  isLoadingM1? = AlgorithmStateEnum;
  isLoadingM2 = true;
  isLoadingM3 = true;
  isLoadingM4 = true;


  diesel_engine: DieselEngineEnum | undefined;
  starting_system: StartingSystemEnum | undefined;
  auxiliary_pto: AuxiliaryPtoEnum | undefined;
  oil_system: OilSystemEnum | undefined;
  fuel_system: FuelSystemEnum | undefined;
  cooling_system: CoolingSystemEnum | undefined;
  exhaust_system: ExhaustSystemEnum | undefined;
  mounting_system: MountingSystemEnum | undefined;
  engine_management_system: EngineManagementSystemEnum | undefined;
  monitoring_system: MonitoringSystems | undefined;
  power_transmission: PowerTransmission | undefined;
  gear_box_option: GearBoxOptions | undefined;
  state: AlgorithmStateEnum | undefined;

  buttonClicked = true;
  resultText = "Result:";


  m1Status: any;
  m2Status: any;
  m3Status: any;
  m4Status: any;

  diesel_engines: select_interface[] = [
    {value: DieselEngineEnum.V10, viewValue: '10V'},
    {value: DieselEngineEnum.V12, viewValue: '12V'},
    {value: DieselEngineEnum.V16, viewValue: '16V'}
  ];

  starting_systems: select_interface[] = [
    {value: StartingSystemEnum.AirStarter, viewValue: 'Air Starter'},
    {value: StartingSystemEnum.ElectricStarter, viewValue: 'Electric Starter'},
    {value: StartingSystemEnum.HydraulicStarter, viewValue: 'Hydraulic Starter'},
    {value: StartingSystemEnum.PneumaticStarter, viewValue: 'Pneumatic Starter'},
    {value: StartingSystemEnum.Other, viewValue: 'Other'}
  ];

  auxiliary_ptos: select_interface[] = [
    {value: AuxiliaryPtoEnum.Alternator, viewValue: 'Alternator'},
    {value: AuxiliaryPtoEnum.A140AOr190A, viewValue: 'A140A or 190A'},
    {value: AuxiliaryPtoEnum.BV2, viewValue: '2BV'},
    {value: AuxiliaryPtoEnum.Pole2, viewValue: '2 pole'},
    {value: AuxiliaryPtoEnum.Bilgepump, viewValue: 'Bilgepump'},
    {value: AuxiliaryPtoEnum.OnEnginePto, viewValue: 'On-engine PTOs'}
  ];

  oil_systems: select_interface[] = [
    {value: OilSystemEnum.OilReplenishmentSystem, viewValue: 'Oil replenishment system'},
    {value: OilSystemEnum.DiverterValveForDuplexFilter, viewValue: 'Diverter valve for duplex filter'}
  ];


  fuel_systems: select_interface[] = [
    {value: FuelSystemEnum.DuplexFuelPreFilter, viewValue: 'Duplex fuel pre-filter'},
    {value: FuelSystemEnum.DiverterValveForFuelFilter, viewValue: 'Diverter valve for fuel filter'},
    {value: FuelSystemEnum.MonitoringFuelLeakage, viewValue: 'Monitoring fuel leakage'}
  ];

  cooling_systems: select_interface[] = [
    {value: CoolingSystemEnum.CoolantPreheatingSystem, viewValue: 'Coolant preheating System'},
    {value: CoolingSystemEnum.SeawaterGearboxPiping, viewValue: 'Seawater gearbox piping'}
  ];

  exhaust_systems: select_interface[] = [
    {value: ExhaustSystemEnum.ExhaustBellowsDischargeRotable90, viewValue: '90 Exhaust bellows discharge rotable'},
    {value: ExhaustSystemEnum.ExhaustBellowsDischargeFixed90, viewValue: '90 Exhaust bellows discharge fixed'},
    {value: ExhaustSystemEnum.Other, viewValue: 'Other'}
  ];

  mounting_systems: select_interface[] = [
    {value: MountingSystemEnum.ResilientMountsAtDrivingEnd, viewValue: 'Resilient mounts at driving end'},
    {value: MountingSystemEnum.ResilientMountsAtNonDrivingEnd, viewValue: 'Resilient mounts at non-driving end'},
    {value: MountingSystemEnum.Other, viewValue: 'Other'}
  ];

  engine_management_systems: select_interface[] = [
    {value: EngineManagementSystemEnum.InComplianceWithCSR, viewValue: "In compliance with CSR"},
    {value: EngineManagementSystemEnum.InComplianceWithEPA, viewValue: "In compliance with EPA"},
    {value: EngineManagementSystemEnum.Other, viewValue: "Other"}
  ];

  monitoring_systems: select_interface[] = [
    {value: MonitoringSystems.BlueVision, viewValue: "BlueVision"},
    {value: MonitoringSystems.BlueDrivePlusC, viewValue: "BlueDrive PlusC"}
  ];

  power_transmissions: select_interface[] = [
    {value: PowerTransmission.TorsionallyResilientCoupling, viewValue: "Torsionally resilient coupling"},
    {value: PowerTransmission.VDrive, viewValue: "V-drive"},
    {value: PowerTransmission.CardanShaft, viewValue: "Cardan shaft"},
    {value: PowerTransmission.Other, viewValue: "Other"}
  ];

  gear_box_options: select_interface[] = [
    {value: GearBoxOptions.ReverseReductionGearbox, viewValue: "Reverse reduction gearbox"},
    {value: GearBoxOptions.ElActuated, viewValue: "El.actuated"},
    {value: GearBoxOptions.GearboxMounts, viewValue: "Gearbox mounts"},
    {value: GearBoxOptions.TrollingModeForDeadSlowPropulsion, viewValue: "Trolling mode for dead-slow propulsion"},
    {value: GearBoxOptions.FreeAuxiliaryPTO, viewValue: "Free auxiliary PTO"}
  ];

  selectedCount(): number {
    const options = [
      this.diesel_engine, this.starting_system, this.auxiliary_pto, this.oil_system, this.fuel_system, this.cooling_system,
      this.exhaust_system, this.mounting_system, this.engine_management_system, this.monitoring_system, this.power_transmission,
      this.gear_box_option
    ];
    let count = 0;
    for (const option of options) {
      if (option) {
        count++;
      }
    }
    return count;
  }

  calculateProgress(): number {
    const totalCount = 12;
    const selectedCount = this.selectedCount();
    return (selectedCount / totalCount) * 100;
  }

  checkResult() {
    if (this.selectedCount() === 12){
      return "ok";
    }else{
      return "failed";
    }
  }

  onSumbit() {
    if (this.selectedCount() === 12) {
      this.buttonClicked = true;
      const checkEngineDto: CheckConfigurationDto = {
        userID: this.sessionID,
        diesel_engine: this.diesel_engine!,
        starting_system: this.starting_system!,
        auxiliary_pto: this.auxiliary_pto!,
        oil_system: this.oil_system!,
        fuel_system: this.fuel_system!,
        cooling_system: this.cooling_system!,
        exhaust_system: this.exhaust_system!,
        mounting_system: this.mounting_system!,
        engine_management_system: this.engine_management_system!,
        monitoring_system: this.monitoring_system!,
        power_transmission: this.power_transmission!,
        gear_box_option: this.gear_box_option!
      };
      this.engineService.checkConfiguration(checkEngineDto).subscribe(
        (response) => {
          alert(response['OptEquipValid']);
        });
        
      this.setStatus();
    }
    
  }

  setStatus() {
    this.engineService.checkAlgorithmState({userID:this.sessionID},MicroserviceAddressEnum.engine).subscribe(
      (response) => {
        this.m1Status = response.algorithmState;
      });
  }

}
