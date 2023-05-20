import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
@Component({
  selector: 'wir-schiffen-das-home',
  standalone: true,
  imports: [CommonModule, MatOptionModule, MatSelectModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: []
})


export class HomeComponent {

  starting_system = "None";
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

  starting_systems: string[] = [
    'Air Starter','Electric Starter','Hydraulic Starter','Pneumatic Starter','Other'
    ];
  selected = 'option2';

}

