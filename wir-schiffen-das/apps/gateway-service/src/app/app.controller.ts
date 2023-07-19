import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { AlgorithmStateEnum, CheckAlgorithmStateDto, ReturnAlgorithmStateDto } from '@wir-schiffen-das/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }




  @Get()
  getData() {
    return this.appService.getData();
  }
}
