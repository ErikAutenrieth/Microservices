import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CheckConfigurationDto,
  CreateAlgorithmStateDto,
  InitializeAlgorithmMicroserviceDto,
  MicroserviceAddressEnum,
} from '@wir-schiffen-das/types';
import { AnchorService } from './anchor.service';

@Controller('anchor')
export class AnchorController {
  constructor(private readonly appService: AnchorService) {}

  /**
   * Handles the POST request for checking configuration.
   *
   * @param CheckConfigurationDto - The data object containing the configuration to be checked.
   * @returns A response indicating the success of the operation.
   */
  @Post('CheckConfiguration')
  @UsePipes(new ValidationPipe())
  async OptEquip(@Body() CheckConfigurationDto: CheckConfigurationDto) {
    console.log(CheckConfigurationDto);
    const algorithmStateDto: CreateAlgorithmStateDto = {
      userId: CheckConfigurationDto.userID,
      Configurations: CheckConfigurationDto,
    };
    const algotithmStateDoc = await this.appService.create(algorithmStateDto);

    // Create a microservice DTO with the algorithm state document's ID
    const microServiceDto: InitializeAlgorithmMicroserviceDto = {
      ...algorithmStateDto,
      ...{ dbId: algotithmStateDoc._id.toString() },
    };

    // Send the configuration to all microservices
    for (const microserviceAddressEnum in MicroserviceAddressEnum) {
      //TODO implement circuit breaker and return success to client
      const res = await this.appService.sendConfigurationToService(
        microServiceDto,
        MicroserviceAddressEnum[microserviceAddressEnum]
      );
      console.log('finished sending configuration to engine', res);
    }

    return { success: true };
  }
}
