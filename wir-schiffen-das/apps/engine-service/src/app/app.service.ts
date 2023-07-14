import {Injectable} from '@nestjs/common';
import {
  ConfigurationDatabaseDto,
  DieselEngineEnum,
  FuelSystemEnum,
  InitializeAlgorithmMicroserviceDto,
  OilSystemEnum,
  StartingSystemEnum} from '@wir-schiffen-das/types';
import {AbstractAppService} from '@wir-schiffen-das/nestjs-types';
import {setTimeout} from "timers/promises";

@Injectable()
export class AppService extends AbstractAppService {

  /**
   * Check the compatibility of algorithm configurations.
   * @param initializeAlgorithmMicroserviceDto The DTO containing the algorithm configurations.
   * @returns A promise representing the incompatible component sets.
   */
  async checkCompactibility(initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto): Promise<Set<DieselEngineEnum | StartingSystemEnum | OilSystemEnum | FuelSystemEnum>[] > {

    // Set of relevant selections from the algorithm configurations
    const relevant_Selections = new Set([
      initializeAlgorithmMicroserviceDto.configuration.diesel_engine,
      initializeAlgorithmMicroserviceDto.configuration.starting_system,
      initializeAlgorithmMicroserviceDto.configuration.oil_system,
      initializeAlgorithmMicroserviceDto.configuration.fuel_system]);

    // Simulate a delay using setTimeout
    await setTimeout(Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000);

    // List of incompatible component sets
    const incompatibleComponents: Set<DieselEngineEnum | StartingSystemEnum | OilSystemEnum | FuelSystemEnum>[] = [
      new Set([DieselEngineEnum.V10, StartingSystemEnum.ElectricStarter]),
      new Set([DieselEngineEnum.V12, OilSystemEnum.DiverterValveForDuplexFilter, FuelSystemEnum.MonitoringFuelLeakage]),
    ];
    // Filter incompatible subsets based on relevant selections
    const filteredIncompatibleComponents = incompatibleComponents.filter(incompatibleComponent =>
      [...incompatibleComponent].every(component => relevant_Selections.has(component)));
      console.log(filteredIncompatibleComponents);

    return filteredIncompatibleComponents;
  }

    /**
   * Check the compatibility of algorithm configurations.
   * @param initializeAlgorithmMicroserviceDto The DTO containing the algorithm configurations.
   * @returns A promise representing the incompatible component sets.
   */
    async checkKafkaCompactibility(configuration: ConfigurationDatabaseDto): Promise<Set<DieselEngineEnum | StartingSystemEnum | OilSystemEnum | FuelSystemEnum>[] > {

      // Set of relevant selections from the algorithm configurations
      const relevant_Selections = new Set([
        configuration.diesel_engine,
        configuration.starting_system,
        configuration.oil_system,
        configuration.fuel_system]);
  
      // Simulate a delay using setTimeout
      await setTimeout(Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000);
  
      // List of incompatible component sets
      const incompatibleComponents: Set<DieselEngineEnum | StartingSystemEnum | OilSystemEnum | FuelSystemEnum>[] = [
        new Set([DieselEngineEnum.V10, StartingSystemEnum.ElectricStarter]),
        new Set([DieselEngineEnum.V12, OilSystemEnum.DiverterValveForDuplexFilter, FuelSystemEnum.MonitoringFuelLeakage]),
      ];
      // Filter incompatible subsets based on relevant selections
      const filteredIncompatibleComponents = incompatibleComponents.filter(incompatibleComponent =>
        [...incompatibleComponent].every(component => relevant_Selections.has(component)));
        console.log(filteredIncompatibleComponents);
  
      return filteredIncompatibleComponents;
    }

}

