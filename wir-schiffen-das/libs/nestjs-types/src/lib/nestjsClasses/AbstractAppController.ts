import {Body, Controller, Inject, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

import {
  AlgorithmStateEnum,
  CheckAlgorithmStateDto,
  ConfigurationValidationInitDto,
  CreateAlgorithmStateDto,
  InitializeAlgorithmMicroserviceDto,
  ReturnAlgorithmStateDto,
} from "@wir-schiffen-das/types";
import { AbstractAppService } from './AbstractAppService';
import { AlgorithmState, AlgorithmStateDocument } from '../mongoose.shemas';

export abstract class AbstractAppController {

  protected Algorithm!: String;
  constructor(private readonly appService: AbstractAppService) {
  }

  /**
   * Handles the POST request for checking configuration.
   *
   * @param initializeAlgorithmMicroserviceDto - The data object containing the configuration to be checked.
   */
  @Post("CheckConfiguration")
  @UsePipes(new ValidationPipe())
  async CheckConfiguration(@Body() initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto) {

    console.log("start checking configuration");
    this.checkConfigurationHelper(initializeAlgorithmMicroserviceDto);

  }

  @MessagePattern('new_config_request')
  handleNewConfigRequest(@Payload() message: ConfigurationValidationInitDto, @Ctx() context: KafkaContext) {
    // Handle the incoming message
    console.log('Received new kafka config request:', message);
    this.checkKafkaConfigurationHelper(message);
  }


  /**
   * Helper method for checking configuration.
   *
   * @param initializeAlgorithmMicroserviceDto - The data object containing the configuration to be checked.
   */
  async checkConfigurationHelper(initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto) {
    console.log("start checking configuration");
    console.log("start checking configuration algorithm");

    // Update the algorithm state to "running"
    await this.appService.updateAlgorithmState(initializeAlgorithmMicroserviceDto.dbId, { [this.Algorithm + "State"]: AlgorithmStateEnum.running});
    // Check compatibility of components
    let incompatibleComponents = await this.appService.checkCompactibility(initializeAlgorithmMicroserviceDto);

    if (incompatibleComponents.length > 0) {
      incompatibleComponents = incompatibleComponents.reduce((result: string[], set: Set<string>) => {
        return [...result, ...Array.from(set)];
      }, []);
      // Update the algorithm state to "failed" with incompatible components
      console.log("incompatible components", incompatibleComponents);
      const updated = await this.appService.updateAlgorithmState(initializeAlgorithmMicroserviceDto.dbId, {
        [this.Algorithm + "State"]: AlgorithmStateEnum.failed,
        incompactibleConfigurations: incompatibleComponents
      });
      console.log("updated", updated);
    } else {
      // Update the algorithm state to "ready"
      await this.appService.updateAlgorithmState(initializeAlgorithmMicroserviceDto.dbId, {[this.Algorithm + "State"]: AlgorithmStateEnum.ready});
    }
  }

  async checkKafkaConfigurationHelper(configurationValidationInitDto: ConfigurationValidationInitDto) {
    const dbEntry = await this.appService.getDatabaseEntry(configurationValidationInitDto.dbId);
    const configuration = dbEntry!.configuration;

    await this.appService.updateKafkaStateAndDB(this.Algorithm, configurationValidationInitDto, { [this.Algorithm + "State"]: AlgorithmStateEnum.running});
    // Check compatibility of components
    let incompatibleComponents = await this.appService.checkKafkaCompactibility(configuration);

    if (incompatibleComponents.length > 0) {
      incompatibleComponents = incompatibleComponents.reduce((result: string[], set: Set<string>) => {
        return [...result, ...Array.from(set)];
      }, []);
      // Update the algorithm state to "failed" with incompatible components
      console.log("incompatible components", incompatibleComponents);
      const updated = await this.appService.updateKafkaStateAndDB(this.Algorithm, configurationValidationInitDto, {
        [this.Algorithm + "State"]: AlgorithmStateEnum.failed,
        incompactibleConfigurations: incompatibleComponents
      });
      console.log("updated", updated);
    } else {
      // Update the algorithm state to "ready"
      await this.appService.updateKafkaStateAndDB(this.Algorithm, configurationValidationInitDto, {[this.Algorithm + "State"]: AlgorithmStateEnum.ready});
    }  
  }

  /**
   * Handles the POST request for getting the algorithm status.
   *
   * @param checkStatus - The data object containing the user ID to check the algorithm status.
   * @returns A Promise resolving to the algorithm state and incompatible components.
   */
  @Post("Status")
  @UsePipes(new ValidationPipe())
  async Status(@Body() checkStatus: CheckAlgorithmStateDto): Promise<ReturnAlgorithmStateDto> {

    const algorithmState = await this.appService.getAlgorithmStateForUser(checkStatus.userID);
    const algorithmStateEnum: AlgorithmStateEnum | undefined = algorithmState?.get(this.Algorithm + "State");
    return {
      userID: checkStatus.userID,
      algorithmState: algorithmStateEnum ? algorithmStateEnum : AlgorithmStateEnum.notStarted,
      incompatibleComponents: algorithmState?.incompactibleConfigurations ? algorithmState.incompactibleConfigurations : []
    };

  }
}


