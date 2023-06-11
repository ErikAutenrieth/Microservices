import {Injectable} from '@nestjs/common';
import {AlgorithmStateDocument, BaseDatabaseServer} from "@wir-schiffen-das/nestjs-types";
import {
  CoolingSystemEnum,
  InitializeAlgorithmMicroserviceDto,
  OilSystemEnum, PowerTransmission,
  UpdateAlgorithmStateDto
} from "@wir-schiffen-das/types";
import {setTimeout} from "timers/promises";

@Injectable()
export class AppService {
  constructor(private baseDatabase: BaseDatabaseServer,) {
  }

  // Update the algorithm state for a specific database entry
  updateAlgorithmState(dbEntryID: string, updatedPart: UpdateAlgorithmStateDto) {
    return this.baseDatabase.update(dbEntryID, updatedPart);
  }

  // Retrieve the algorithm state for a specific user
  async getAlgorithmStateForUser(userID: string): Promise<AlgorithmStateDocument> {
    return await this.baseDatabase.findByUserId(userID);
  }

  /**
   * Check the compatibility of algorithm configurations.
   * @param initializeAlgorithmMicroserviceDto The DTO containing the algorithm configurations.
   * @returns A promise representing the incompatible component sets.
   */
  async checkCompactibility(initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto): Promise<any[]> {

    // Set of relevant selections from the algorithm configurations
    const relevant_Selections = new Set([
      initializeAlgorithmMicroserviceDto.Configurations.power_transmission,
      initializeAlgorithmMicroserviceDto.Configurations.cooling_system,
      initializeAlgorithmMicroserviceDto.Configurations.oil_system,]);

    // Simulate a delay using setTimeout
    await setTimeout(Math.floor(Math.random() * (30000 - 5000 + 1)) + 4000);

    // List of incompatible component sets
    const incompatibleComponents: Set<PowerTransmission | CoolingSystemEnum | OilSystemEnum>[] = [
      new Set([PowerTransmission.VDrive, CoolingSystemEnum.SeawaterGearboxPiping]),
      new Set([PowerTransmission.CardanShaft, OilSystemEnum.DiverterValveForDuplexFilter]),
    ];
    // Filter incompatible subsets based on relevant selections
    return incompatibleComponents.filter(incompatibleComponent =>
      [...incompatibleComponent].every(component => relevant_Selections.has(component))
    );
  }
}
