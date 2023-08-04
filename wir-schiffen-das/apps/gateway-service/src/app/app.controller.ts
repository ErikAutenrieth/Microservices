import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { AppService } from './app.service';
import { CheckAlgorithmStateDto, DevMicroserviceAddressEnum } from '@wir-schiffen-das/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Post(":algorithm/Status")
  @UsePipes(new ValidationPipe())
  async CheckConfiguration(@Param('algorithm') algorithm: string, @Body() checkStatus: CheckAlgorithmStateDto) {

    if (!(algorithm in DevMicroserviceAddressEnum)) {
      throw new HttpException('Algorithm not found' , HttpStatus.BAD_REQUEST);
    }
    console.log("start checking configuration for algorithm: " + algorithm);
    const res = await this.appService.getRESTAlgorithmStateForUser(algorithm, checkStatus);
    return res.data;

  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
