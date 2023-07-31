import { Injectable } from '@nestjs/common';
import {
  AuxiliaryPtoEnum,
  ConfigurationDatabaseDto,
  EngineManagementSystemEnum, GearBoxOptions,
  InitializeAlgorithmMicroserviceDto,
  PowerTransmission, StartingSystemEnum,
} from '@wir-schiffen-das/types';
import { AbstractAppService } from '@wir-schiffen-das/nestjs-types';
import { setTimeout } from "timers/promises";

@Injectable()
export class AppService extends AbstractAppService {

  /**
   * Check the compatibility of algorithm configurations.
   * @param initializeAlgorithmMicroserviceDto The DTO containing the algorithm configurations.
   * @returns A promise representing the incompatible component sets.
   */
  async checkCompactibility(initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto): Promise<Set<PowerTransmission | EngineManagementSystemEnum >[]> {

    // Set of relevant selections from the algorithm configurations
    const relevant_Selections = new Set([
      initializeAlgorithmMicroserviceDto.configuration.power_transmission,
      initializeAlgorithmMicroserviceDto.configuration.engine_management_system,
    ]);

    // Simulate a delay using setTimeout
    await setTimeout(20000);

    // List of incompatible component sets
    const incompatibleComponents: Set<PowerTransmission | EngineManagementSystemEnum>[] = [
      new Set([PowerTransmission.TorsionallyResilientCoupling, EngineManagementSystemEnum.InComplianceWithCSR]),
    ];
    // Filter incompatible subsets based on relevant selections
    return incompatibleComponents.filter(incompatibleComponent =>
      [...incompatibleComponent].every(component => relevant_Selections.has(component))
    );
  }

  async checkKafkaCompactibility(configuration: ConfigurationDatabaseDto): Promise<Set<PowerTransmission | EngineManagementSystemEnum >[]> {
    // Set of relevant selections from the algorithm configurations
    const relevant_Selections = new Set([
      configuration.power_transmission,
      configuration.engine_management_system,
    ]);

    // Simulate a delay using setTimeout
    await setTimeout(20000);

    // List of incompatible component sets
    const incompatibleComponents: Set<PowerTransmission | EngineManagementSystemEnum>[] = [
      new Set([PowerTransmission.TorsionallyResilientCoupling, EngineManagementSystemEnum.InComplianceWithCSR]),
    ];
    // Filter incompatible subsets based on relevant selections
    return incompatibleComponents.filter(incompatibleComponent =>
      [...incompatibleComponent].every(component => relevant_Selections.has(component))
    );
  }

}

