import { Body, Controller, Get, Post } from "@nestjs/common";
import { EngineService } from "./engine.service";
import { CheckConfigurationDto, CreateAlgorithmStateDto } from "@wir-schiffen-das/types";

@Controller("engine")
export class EngineController {
  constructor(private readonly appService: EngineService) { }

  @Get()
  getData() {
    return "Hello API From Engine";
  }

  @Post("OptEquip")
  OptEquip(@Body() CheckConfigurationDto: CheckConfigurationDto) {
    console.log(CheckConfigurationDto);
    const algorithmStateDto: CreateAlgorithmStateDto = { userId: CheckConfigurationDto.userID };
    const algotithmStateDoc =  this.appService.create(algorithmStateDto);
    console.log(algotithmStateDoc);
    return { "OptEquipValid": true };
  }

}