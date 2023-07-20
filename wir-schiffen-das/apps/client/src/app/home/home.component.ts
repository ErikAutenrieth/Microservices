import { Component, HostListener } from "@angular/core";
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
  DevMicroserviceAddressEnum,
  DieselEngineEnum,
  EngineManagementSystemEnum,
  ExhaustSystemEnum,
  FuelSystemEnum,
  GearBoxOptions,
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
import { randomStringEnumValue } from "@wir-schiffen-das/types";

import {
  diesel_engines, starting_systems, auxiliary_ptos, oil_systems, fuel_systems, cooling_systems,
  exhaust_systems, mounting_systems, engine_management_systems, monitoring_systems, power_transmissions, gear_box_options, components_failure,
  THUMBUP_ICON, RED_CROSS_ICON
} from "@wir-schiffen-das/types";
import { environment } from "../../environments/environment";
import { WebsocketService } from "../../services/WebsocketService";


enum UIAlgorithmStateEnum {
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

  constructor(
    private engineService: EngineService, 
    private sessionService: SessionService, 
    private websocketService: WebsocketService,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer) {
    this.sessionID = sessionService.getSessionId();
    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
    iconRegistry.addSvgIconLiteral('red-cross', sanitizer.bypassSecurityTrustHtml(RED_CROSS_ICON));
  }


  ngOnInit() {
    this.engineService.test();

    this.websocketService.subscribeToAlgorithmStates().subscribe((message) => {
      console.log(message);
    });
  }


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'r') {
      this.diesel_engine = randomStringEnumValue(DieselEngineEnum);
      this.starting_system = randomStringEnumValue(StartingSystemEnum);
      this.auxiliary_pto = randomStringEnumValue(AuxiliaryPtoEnum);
      this.oil_system = randomStringEnumValue(OilSystemEnum);
      this.fuel_system = randomStringEnumValue(FuelSystemEnum);
      this.cooling_system = randomStringEnumValue(CoolingSystemEnum);
      this.exhaust_system = randomStringEnumValue(ExhaustSystemEnum);
      this.mounting_system = randomStringEnumValue(MountingSystemEnum);
      this.engine_management_system = randomStringEnumValue(EngineManagementSystemEnum);
      this.monitoring_system = randomStringEnumValue(MonitoringSystems);
      this.power_transmission = randomStringEnumValue(PowerTransmission);
      this.gear_box_option = randomStringEnumValue(GearBoxOptions);
    }
  }

  // spinner props
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  algorithmStates: Record<string, AlgorithmStateEnum | UIAlgorithmStateEnum | undefined> = {
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
  result_state: "ok" | "failed" | "" | undefined;
  // TODO update automatically if any state in algorithmStates changes and set to startet if one is started and failed if one is failed



  buttonClicked = true;
  resultAvailable = false;

  incompatible_components: (DieselEngineEnum | StartingSystemEnum | AuxiliaryPtoEnum | OilSystemEnum | FuelSystemEnum | CoolingSystemEnum | ExhaustSystemEnum | MountingSystemEnum | EngineManagementSystemEnum | MonitoringSystems | PowerTransmission | GearBoxOptions)[] = [];

  // incompatible_components: any = [];

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

  checkReady = (): string => (this.selectedCount() === 12) ? "ready" : "not ready";

  calculateProgress(): number {
    const totalCount = 12;
    const selectedCount = this.selectedCount();
    return (selectedCount / totalCount) * 100;
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
          console.log(response);
        });

      this.incompatible_components = [];
      // this.setStatus();
    }
  }

  checkResult() {
    const allStatesOk = Object.values(this.algorithmStates).every(state => state === AlgorithmStateEnum.ready);
    const failedState = Object.values(this.algorithmStates).some(state => state === AlgorithmStateEnum.failed);
    const runningState = Object.values(this.algorithmStates).some(state => state === AlgorithmStateEnum.running);

    if (allStatesOk) {
      this.result_state = "ok";
      return;
    } else if (failedState) {
      this.result_state = "failed";
      console.log(this.incompatible_components);
      return;
    } else if (runningState) {
      this.result_state = "";
    }

    console.log(this.result_state);
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

  /**
 * Set the status of the algorithm states.
 */
  setStatus() {
    // Reset all algorithm states to undefined
    Object.keys(this.algorithmStates).forEach(key => this.algorithmStates[key] = undefined);
    // Iterate through each algorithm and check its state
    for (const [algorithm, state] of Object.entries(this.algorithmStates)) {
      // Get the microservice URL for the algorithm
      const microservice: DevMicroserviceAddressEnum = environment.APIUrls[algorithm as keyof typeof DevMicroserviceAddressEnum];
      // Call the engine service to check the algorithm state
      this.engineService.checkAlgorithmState(
        { userID: this.sessionID }, microservice)
        .subscribe(
          {
            next: (res: ReturnAlgorithmStateDto) => {
              // Update the algorithm state 
              this.algorithmStates[algorithm] = res.algorithmState
              if (res.algorithmState === AlgorithmStateEnum.failed && res.incompatibleComponents !== undefined) {
                console.log("raw ", res.incompatibleComponents);
                this.incompatible_components = Array.from(new Set(this.incompatible_components.concat(res.incompatibleComponents)));
                console.log("updated incompactibilities ", res.incompatibleComponents);
              }

              this.checkStates();
              this.checkResult();
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
