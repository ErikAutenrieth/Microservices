import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateAlgorithmStateDto } from "@wir-schiffen-das/types";

@Controller("engine")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post("CheckConfiguration") 
  CheckConfiguration(@Body() checkConfigurationDto: CreateAlgorithmStateDto) {

  }
}
