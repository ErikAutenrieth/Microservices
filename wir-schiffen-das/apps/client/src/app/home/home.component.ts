import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { FormsModule } from '@angular/forms';

interface starting_system_select {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'wir-schiffen-das-home',
  standalone: true,
  imports: [CommonModule, MatOptionModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: []
})

export class HomeComponent {

  starting_system: string | undefined;

  auxiliary_system = 0.0;
  oil_system = 0.0;
  fuel_system = 0.0;
  cooling_system = 0.0;
  exhaust_system = 0.0;
  mounting_system = 0.0;
  engine_control_system = 0.0;
  monitoring_system = 0.0;
  power_trainsmission = 0.0;
  gear_box_options = 0.0;

  starting_systems: starting_system_select[] = [
    {value: 'Air Starter', viewValue: 'Air Starter'},
    {value: 'Electric Starter', viewValue: 'Electric Starter'},
    {value: 'Hydraulic Starter', viewValue: 'Hydraulic Starter'},
    {value: 'Pneumatic Starter', viewValue: 'Pneumatic Starter'},
    {value: 'Other', viewValue: 'Other'}
  ];

}

