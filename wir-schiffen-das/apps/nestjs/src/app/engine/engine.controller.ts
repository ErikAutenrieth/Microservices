import { Body, Controller, Get, Post } from "@nestjs/common";
import { EngineService } from "./engine.service";
import { CheckEngineStatusDto } from "@wir-schiffen-das/types";

@Controller("engine")
export class EngineController {
  constructor(private readonly appService: EngineService) { }

  @Get()
  getData() {
    return "Hello API From Engine";
  }

  @Post("OptEquip")
  OptEquip(@Body() checkEngineStatusDto: CheckEngineStatusDto) {
    console.log(checkEngineStatusDto);
    return { "OptEquipValid": true };
  }

}