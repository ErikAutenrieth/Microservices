import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { EngineService } from "./engine.service";
import { CheckConfigurationDto, CreateAlgorithmStateDto, InitializeAlgorithmMicroserviceDto, MicroserviceAddressEnum } from "@wir-schiffen-das/types";


@Controller("anchor")
export class EngineController {
  constructor(private readonly appService: EngineService) { }

  @Get()
  getData() {
    return "Hello API From Engine";
  }
  /**
   * Handles the POST request for checking configuration.
   *
   * @param CheckConfigurationDto - The data object containing the configuration to be checked.
   * @returns A response indicating the success of the operation.
   */
  @Post("CheckConfiguration")
  @UsePipes(new ValidationPipe())
  async OptEquip(@Body() CheckConfigurationDto: CheckConfigurationDto) {
    console.log(CheckConfigurationDto);
    const algorithmStateDto: CreateAlgorithmStateDto = { userId: CheckConfigurationDto.userID, Configurations: CheckConfigurationDto };
    const algotithmStateDoc = await this.appService.create(algorithmStateDto);

    // Create a microservice DTO with the algorithm state document's ID
    const microServiceDto : InitializeAlgorithmMicroserviceDto  = { ...algorithmStateDto, ... { dbId: algotithmStateDoc._id.toString()}  };

    // for (const microserviceAddressEnum in MicroserviceAddressEnum) {
    //   this.appService.sendConfigurationToService(microServiceDto, MicroserviceAddressEnum[microserviceAddressEnum]);
    // }

    // Send the microservice DTO to the engine microservice
    const res = await this.appService.sendConfigurationToService(microServiceDto, MicroserviceAddressEnum.engine);
    console.log("finished sending configuration to engine", res);
    return { "sucess": true };
  }

}
