import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import { AbstractAppController } from '@wir-schiffen-das/nestjs-types';

@Controller("cooling")
export class AppController extends AbstractAppController  {

  constructor(appService: AppService) {
    super(appService);
    this.Algorithm = "coolingExhaust";
  }

}

