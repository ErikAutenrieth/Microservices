import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import { AbstractAppController } from '@wir-schiffen-das/nestjs-types';

@Controller("control")
export class AppController extends AbstractAppController  {

  constructor(appService: AppService) {
    super(appService);
  }

}

