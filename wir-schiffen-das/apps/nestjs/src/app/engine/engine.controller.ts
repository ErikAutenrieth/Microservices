import { Body, Controller, Get, Post } from "@nestjs/common";
import { EngineService } from "./engine.service";
import { CheckConfigurationDto, CreateAlgorithmStateDto, InitializeAlgorithmMicroserviceDto, MicroserviceAddressEnum } from "@wir-schiffen-das/types";


@Controller("anchor")
export class EngineController {
  constructor(private readonly appService: EngineService) { }

  @Get()
  getData() {
    return "Hello API From Engine";
  }

  @Post("CheckConfiguration")
  async OptEquip(@Body() CheckConfigurationDto: CheckConfigurationDto) {
    console.log(CheckConfigurationDto);
    const algorithmStateDto: CreateAlgorithmStateDto = { userId: CheckConfigurationDto.userID, Configurations: CheckConfigurationDto };
    const algotithmStateDoc = await this.appService.create(algorithmStateDto);
    const microServiceDto : InitializeAlgorithmMicroserviceDto  = { ...algorithmStateDto, ... { dbId: algotithmStateDoc._id.toString()}  };
    // for (const microserviceAddressEnum in MicroserviceAddressEnum) {
    //   this.appService.sendConfigurationToService(microServiceDto, MicroserviceAddressEnum[microserviceAddressEnum]);
    // }
    const res = await this.appService.sendConfigurationToService(microServiceDto, MicroserviceAddressEnum.engine);
    console.log("finished sending configuration to engine", res);
    return { "sucess": true };
  }

}