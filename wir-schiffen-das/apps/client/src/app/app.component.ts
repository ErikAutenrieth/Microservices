import {Component, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";



@Component({
  standalone: true,
  imports: [RouterModule, HomeComponent],
  selector: 'wir-schiffen-das-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: []
})
export class AppComponent {
  title = 'client';
}

