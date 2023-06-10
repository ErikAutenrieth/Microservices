import {Injectable} from '@nestjs/common';
import {
  DieselEngineEnum,
  FuelSystemEnum,
  InitializeAlgorithmMicroserviceDto,
  OilSystemEnum,
  StartingSystemEnum,
  UpdateAlgorithmStateDto
} from '@wir-schiffen-das/types';
import {AlgorithmStateDocument, BaseDatabaseServer} from '@wir-schiffen-das/nestjs-types';
import {setTimeout} from "timers/promises";

@Injectable()
export class AppService {

  constructor(private baseDatabase: BaseDatabaseServer,) {
  }

  updateAlgorithmState(dbEntryID: string, updatedPart: UpdateAlgorithmStateDto) {
    return this.baseDatabase.update(dbEntryID, updatedPart);
  }

  async getAlgorithmStateForUser(userID: string): Promise<AlgorithmStateDocument> {
    return await this.baseDatabase.findByUserId(userID);
  }

  // Check compatibility of algorithm configurations
  async checkCompactibility(initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto): Promise<any[]> {

    // Set of relevant selections from the algorithm configurations
    const relevant_Selections = new Set([initializeAlgorithmMicroserviceDto.Configurations.diesel_engine,
      initializeAlgorithmMicroserviceDto.Configurations.starting_system, initializeAlgorithmMicroserviceDto.Configurations.oil_system,
      initializeAlgorithmMicroserviceDto.Configurations.fuel_system]);

    // Simulate a delay using setTimeout
    await setTimeout(Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000);

    // List of incompatible component sets
    const incompatibleComponents: Set<DieselEngineEnum | StartingSystemEnum | OilSystemEnum | FuelSystemEnum>[] = [
      new Set([DieselEngineEnum.V10, StartingSystemEnum.ElectricStarter]),
      new Set([DieselEngineEnum.V12, OilSystemEnum.DiverterValveForDuplexFilter, FuelSystemEnum.MonitoringFuelLeakage]),
    ];
    // Filter incompatible subsets based on relevant selections
    return incompatibleComponents.filter(incompatibleComponent =>
      [...incompatibleComponent].every(component => relevant_Selections.has(component))
    );
  }

}

