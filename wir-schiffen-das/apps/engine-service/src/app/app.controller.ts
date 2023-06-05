import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { AlgorithmStateEnum, CheckAlgorithmStateDto, CreateAlgorithmStateDto, InitializeAlgorithmMicroserviceDto, ReturnAlgorithmStateDto, UpdateAlgorithmStateDto } from "@wir-schiffen-das/types";

@Controller("engine")
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post("CheckConfiguration")
  async CheckConfiguration(@Body() initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto) {

    this.appService.updateAlgorithmState(initializeAlgorithmMicroserviceDto.dbId, { ResultState: AlgorithmStateEnum.running });

    const incompatibleComponents = await this.appService.checkCompactibility(initializeAlgorithmMicroserviceDto);

    if (incompatibleComponents.length > 0) {
      this.appService.updateAlgorithmState(initializeAlgorithmMicroserviceDto.dbId, { ResultState: AlgorithmStateEnum.failed, incompactibleConfigurations: incompatibleComponents });
    } else {
      this.appService.updateAlgorithmState(initializeAlgorithmMicroserviceDto.dbId, { ResultState: AlgorithmStateEnum.ready });
    }

  }

  @Post("Status")
  async Status(@Body() checkStatus: CheckAlgorithmStateDto): Promise<ReturnAlgorithmStateDto> {

    const algorithmState =  await this.appService.getAlgorithmStateForUser(checkStatus.userID);
    return { userID: checkStatus.userID, algorithmState: algorithmState.engineState, incompatibleComponents: algorithmState.incompactibleConfigurations };

  }
}
