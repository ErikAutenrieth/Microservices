import { Injectable } from '@nestjs/common';
import { DatabaseSubscriptionService } from './database.subscription.service';
import { AlgorithmStateEnum, CreateAlgorithmStateDto, DieselEngineEnum, FuelSystemEnum, InitializeAlgorithmMicroserviceDto, OilSystemEnum, StartingSystemEnum, UpdateAlgorithmStateDto } from '@wir-schiffen-das/types';
import { AlgorithmStateDocument, BaseDatabaseServer } from '@wir-schiffen-das/nestjs-types';
import { setTimeout } from "timers/promises";

@Injectable()
export class AppService {

  constructor(private baseDatabase : BaseDatabaseServer, ) { }
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  updateAlgorithmState(dbEntryID: string, updatedPart: UpdateAlgorithmStateDto) {
    return this.baseDatabase.update(dbEntryID, updatedPart);
  }

  async getAlgorithmStateForUser(userID: string): Promise<AlgorithmStateDocument> {
    var algorithm = await this.baseDatabase.findByUserId(userID)
    return algorithm[0];
  }

  async checkCompactibility(initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto) : Promise<any[]> {
    const relevant_Selections = new Set([initializeAlgorithmMicroserviceDto.Configurations.diesel_engine, initializeAlgorithmMicroserviceDto.Configurations.starting_system, initializeAlgorithmMicroserviceDto.Configurations.oil_system, initializeAlgorithmMicroserviceDto.Configurations.fuel_system]);

    await setTimeout(Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000);

    const incompatibleComponents: Set<DieselEngineEnum | StartingSystemEnum | OilSystemEnum | FuelSystemEnum>[] = [ 
      new Set([DieselEngineEnum.V10, StartingSystemEnum.ElectricStarter]), 
      new Set([DieselEngineEnum.V12, OilSystemEnum.DiverterValveForDuplexFilter, FuelSystemEnum.MonitoringFuelLeakage]),
  ];

    const incompatibleSubsets = incompatibleComponents.filter(incompatibleComponent =>
      [...incompatibleComponent].every(component => relevant_Selections.has(component))
  );

    
      return incompatibleSubsets;
    }

  }

