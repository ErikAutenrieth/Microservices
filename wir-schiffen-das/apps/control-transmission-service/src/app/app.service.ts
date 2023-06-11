import { Injectable } from '@nestjs/common';
import {
  EngineManagementSystemEnum,
  InitializeAlgorithmMicroserviceDto,
  PowerTransmission,
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
  async checkCompactibility(initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto): Promise<any[]> {

    // Set of relevant selections from the algorithm configurations
    const relevant_Selections = new Set([
      initializeAlgorithmMicroserviceDto.Configurations.power_transmission,
      initializeAlgorithmMicroserviceDto.Configurations.engine_management_system,
    ]);

    // Simulate a delay using setTimeout
    await setTimeout(120000);

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

