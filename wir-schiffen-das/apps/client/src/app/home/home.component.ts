import {Component} from "@angular/core";
import {CommonModule} from '@angular/common';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from '@angular/forms';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";

interface select_interface {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'wir-schiffen-das-home',
  standalone: true,
  imports: [CommonModule, MatOptionModule, MatSelectModule, MatInputModule, FormsModule, MatGridListModule, MatProgressBarModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: []
})

export class HomeComponent {
  diesel_engine: string | undefined;
  starting_system: string | undefined;
  auxiliary_pto: string | undefined;
  oil_system: string | undefined;
  fuel_system: string | undefined;
  cooling_system: string | undefined;
  exhaust_system: string | undefined;
  mounting_system: string | undefined;
  engine_management_system: string | undefined;
  monitoring_system: string | undefined;
  power_transmission: string | undefined;
  gear_box_option: string | undefined;

  diesel_engines: select_interface[] = [
    {value: '10V', viewValue: '10V'},
    {value: '12V', viewValue: '12V'},
    {value: '16V', viewValue: '16V'},
  ];

  starting_systems: select_interface[] = [
    {value: 'Air Starter', viewValue: 'Air Starter'},
    {value: 'Electric Starter', viewValue: 'Electric Starter'},
    {value: 'Hydraulic Starter', viewValue: 'Hydraulic Starter'},
    {value: 'Pneumatic Starter', viewValue: 'Pneumatic Starter'},
    {value: 'Other', viewValue: 'Other'}
  ];

  auxiliary_ptos: select_interface[] = [
    {value: 'Alternator', viewValue: 'Alternator'},
    {value: 'A140A or 190A', viewValue: 'A140A or 190A'},
    {value: '2BV', viewValue: '2BV'},
    {value: '2 pole', viewValue: '2 pole'},
    {value: 'Bilgepump', viewValue: 'Bilgepump'},
    {value: 'On-engine PTOs', viewValue: 'On-engine PTOs'},
  ];

  oil_systems: select_interface[] = [
    {value: 'Oil replenishment system', viewValue: 'Oil replenishment system'},
    {value: 'Diverter valve for duplex filter', viewValue: 'Diverter valve for duplex filter'},
  ];

  fuel_systems: select_interface[] = [
    {value: 'Duplex fuel pre-filter', viewValue: 'Duplex fuel pre-filter'},
    {value: 'Diverter valve for fuel filter', viewValue: 'Diverter valve for fuel filter'},
    {value: 'Monitoring fuel leakage', viewValue: 'Monitoring fuel leakage'},
  ];

  cooling_systems: select_interface[] = [
    {value: 'Coolant preheating System', viewValue: 'Coolant preheating System'},
    {value: 'Seawater gearbox piping', viewValue: 'Seawater gearbox piping'},
  ];

  exhaust_systems: select_interface[] = [
    {value: '90 Exhaust bellows discharge rotable', viewValue: '90 Exhaust bellows discharge rotable'},
    {value: '90 Exhaust bellows discharge fixed', viewValue: '90 Exhaust bellows discharge fixed'},
    {value: 'Other', viewValue: 'Other'},
  ];

  mounting_systems: select_interface[] = [
    {value: 'Resilient mounts at driving end', viewValue: 'Resilient mounts at driving end'},
    {value: 'Resilient mounts at non-driving end', viewValue: 'Resilient mounts at non-driving end'},
    {value: 'Other', viewValue: 'Other'},
  ];

  engine_management_systems: select_interface[] = [
    {value: 'In compliance with CSR', viewValue: 'In compliance with CSR'},
    {value: 'In compliance with EPA', viewValue: 'In compliance with EPA'},
    {value: 'Other', viewValue: 'Other'},
  ];

  monitoring_systems: select_interface[] = [
    {value: 'BlueVision', viewValue: 'BlueVision'},
    {value: 'BlueDrive PlusC', viewValue: 'BlueDrive PlusC'},
  ];

  power_transmissions: select_interface[] = [
    {value: 'Torsionally resilient coupling', viewValue: 'Torsionally resilient coupling'},
    {value: 'V-drive', viewValue: 'V-drive'},
    {value: 'Cardan shaft', viewValue: 'Cardan shaft'},
    {value: 'Other', viewValue: 'Other'},
  ];

  gear_box_options: select_interface[] = [
    {value: 'Reverse reduction gearbox', viewValue: 'Reverse reduction gearbox'},
    {value: 'El.actuated', viewValue: 'El.actuated'},
    {value: 'Gearbox mounts', viewValue: 'Gearbox mounts'},
    {value: 'Trolling mode for dead-slow propulsion', viewValue: 'Trolling mode for dead-slow propulsion'},
    {value: 'Free auxiliary PTO', viewValue: 'Free auxiliary PTO'},
  ];

  selectedCount(): number {
    let count = 0;
    if (this.diesel_engine) count++;
    if (this.starting_system) count++;
    if (this.auxiliary_pto) count++;
    if (this.oil_system) count++;
    if (this.fuel_system) count++;
    if (this.cooling_system) count++;
    if (this.exhaust_system) count++;
    if (this.mounting_system) count++;
    if (this.engine_management_system) count++;
    if (this.monitoring_system) count++;
    if (this.power_transmission) count++;
    if (this.gear_box_option) count++;
    return count;
  }

  calculateProgress(): number {
    const totalCount = 12;
    const selectedCount = this.selectedCount();
    return (selectedCount / totalCount) * 100;
  }
}

