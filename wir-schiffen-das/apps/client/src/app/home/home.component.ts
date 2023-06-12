import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatOptionModule, ThemePalette } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule, ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
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
  StartingSystemEnum
} from "@wir-schiffen-das/types";

import { EngineService } from "../../services/EngineService";
import { SessionService } from "../../services/SessionService";
import { DomSanitizer } from "@angular/platform-browser";
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  diesel_engines, starting_systems, auxiliary_ptos, oil_systems, fuel_systems, cooling_systems,
  exhaust_systems, mounting_systems, engine_management_systems, monitoring_systems, power_transmissions, gear_box_options, components_failure, 
  THUMBUP_ICON, RED_CROSS_ICON
} from "@wir-schiffen-das/types";


enum UIAlgorithmStateEnum  {
  "unresponsive" = "unresponsive"
}

@Component({
  selector: 'wir-schiffen-das-home',
  standalone: true,
  imports: [CommonModule, MatOptionModule, MatSelectModule, MatInputModule, FormsModule, MatGridListModule, MatProgressBarModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule, FlexLayoutModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: []

})



export class HomeComponent {

  private sessionID: string;

  Object = Object;
  diesel_engines = diesel_engines;
  starting_systems = starting_systems;
  auxiliary_ptos = auxiliary_ptos;
  oil_systems = oil_systems;
  fuel_systems = fuel_systems;
  cooling_systems = cooling_systems;
  exhaust_systems = exhaust_systems;
  mounting_systems = mounting_systems;
  engine_management_systems = engine_management_systems;
  monitoring_systems = monitoring_systems;
  power_transmissions = power_transmissions;
  gear_box_options = gear_box_options;

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

  algorithmStates: Record<string, AlgorithmStateEnum | UIAlgorithmStateEnum | undefined>  = {
    "engine": undefined,
    "cooling": undefined,
    "auxiliary": undefined,
    "control": undefined,
  };


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
  result_state: "ok" | "failed" | undefined;
  // TODO update automatically if any state in algorithmStates changes and set to startet if one is started and failed if one is failed



  buttonClicked = true;
  resultAvailable = false;

  // incompatible_components: (DieselEngineEnum | StartingSystemEnum | AuxiliaryPtoEnum | OilSystemEnum | FuelSystemEnum | CoolingSystemEnum | ExhaustSystemEnum | MountingSystemEnum | EngineManagementSystemEnum | MonitoringSystems | PowerTransmission | GearBoxOptions)[] = [];

  incompatible_components: any = [];

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


  checkReady(): string {
    if (this.selectedCount() === 12) {
      return "ready";
    } else {
      return "not ready";
    }
  }


  calculateProgress(): number {
    const totalCount = 12;
    const selectedCount = this.selectedCount();
    return (selectedCount / totalCount) * 100;
  }

  checkIncompatibleComponents(comp: number): boolean {

    if (this.incompatible_components && this.incompatible_components?.length === 0) {
        return false;
    }

    for (let i = 0; i < components_failure.length; i++) {
      if (comp === i && this.incompatible_components?.includes(Object.values(components_failure[i])[0])) {
        return true;
      }
    }
    return false;
  }

  getTextColor(itemStatus: any): any {
    switch (itemStatus) {
      case AlgorithmStateEnum.failed:
        return { color: 'red' };
      case AlgorithmStateEnum.ready || itemStatus === "ok":
        return { color: 'green' };
      default:
        return {}; 
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
      
      this.incompatible_components = [];    
      this.setStatus();
    }
  }

  checkResult(){
    const allStatesOk = Object.values(this.algorithmStates).every(state => state === AlgorithmStateEnum.ready);
    const runningState = Object.values(this.algorithmStates).some(state => state === AlgorithmStateEnum.running);
    const failedState = Object.values(this.algorithmStates).some(state => state === AlgorithmStateEnum.failed);
    if (allStatesOk) {
      this.result_state = "ok";
    }else if (runningState) {
      this.result_state = undefined;
    }else if (failedState){
      this.result_state = "failed";
    }
  }

  checkStates() {
    const allStatesDefined = Object.values(this.algorithmStates).every(state => state !== undefined);
    const allStatesUndefined = Object.values(this.algorithmStates).every(state => state === undefined);
    if (allStatesUndefined) {
      this.resultAvailable = false;
    } else if (allStatesDefined) {
      this.resultAvailable = !Object.values(this.algorithmStates).some(state => state === AlgorithmStateEnum.running || state === AlgorithmStateEnum.notStarted);
    } else {
      this.resultAvailable = true;
    }
  }



  setStatus() {
    Object.keys(this.algorithmStates).forEach(key => this.algorithmStates[key] = undefined);

    for (const [algorithm, state] of Object.entries(this.algorithmStates)) {
      const microservice: MicroserviceAddressEnum = MicroserviceAddressEnum[algorithm as keyof typeof MicroserviceAddressEnum];
      this.engineService.checkAlgorithmState(
        { userID: this.sessionID }, microservice)
        .subscribe(
          {
            next: (res:ReturnAlgorithmStateDto) => { 
              this.algorithmStates[algorithm] = res.algorithmState
              this.checkStates();
              this.checkResult();
              if (res.algorithmState == AlgorithmStateEnum.failed) {
                // fill incompatible components in the UI
                this.incompatible_components += res.incompatibleComponents;
          
              }
            }, 
            error: (err) => {
              this.algorithmStates[algorithm] = UIAlgorithmStateEnum.unresponsive
              console.log(err, algorithm)
              }
          });
    }
    this.checkStates();
    this.checkResult();
  }
}
