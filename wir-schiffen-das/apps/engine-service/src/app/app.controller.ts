import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';

import {AppService} from './app.service';
import {
  AlgorithmStateEnum,
  CheckAlgorithmStateDto,
  InitializeAlgorithmMicroserviceDto,
  ReturnAlgorithmStateDto,
} from "@wir-schiffen-das/types";
import { AbstractAppController } from '@wir-schiffen-das/nestjs-types';

@Controller("engine")
export class AppController extends AbstractAppController  {

  constructor(appService: AppService) {
    super(appService);
  }

}

