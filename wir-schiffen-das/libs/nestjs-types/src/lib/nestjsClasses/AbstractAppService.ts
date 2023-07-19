import { Inject, Injectable } from '@nestjs/common';
import {
  AlgorithmStateEnum,
  ConfigurationDatabaseDto,
  ConfigurationValidationInitDto,
  InitializeAlgorithmMicroserviceDto,
  UpdateAlgorithmStateDto
} from '@wir-schiffen-das/types';
import { AlgorithmStateDocument, BaseDatabaseServer } from '@wir-schiffen-das/nestjs-types';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export abstract class AbstractAppService {
  constructor(protected baseDatabase: BaseDatabaseServer, @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) { }

  // Update the algorithm state for a specific database entry
  updateAlgorithmState(dbEntryID: String, updatedPart: UpdateAlgorithmStateDto) {
    return this.baseDatabase.update(dbEntryID, updatedPart);
  }

  // Update the algorithm state for a specific database entry
  async updateKafkaStateAndDB(algorithm: String, configurationValidationInitDto: ConfigurationValidationInitDto, new_State: UpdateAlgorithmStateDto) {
    console.log("start checking Kafka configuration update");

    const message = {
      key: configurationValidationInitDto.userId,
      value: JSON.stringify(new_State),
    };
    await this.kafkaClient.connect();

    this.kafkaClient.emit('config_update.' + algorithm, message);

    return this.updateAlgorithmState(configurationValidationInitDto.dbId, new_State);
  }

  getDatabaseEntry(dbId: string) {
    return this.baseDatabase.load(dbId);
  }

  // Retrieve the algorithm state for a specific user
  async getAlgorithmStateForUser(userID: string): Promise<AlgorithmStateDocument | null> {
    return await this.baseDatabase.findByUserId(userID);
  }

  /**
   * Check the compatibility of algorithm configurations.
   * @param initializeAlgorithmMicroserviceDto The DTO containing the algorithm configurations.
   * @returns A promise representing the incompatible component sets.
   */
  abstract checkCompactibility(initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto): Promise<any[]>

  /**
   * Check the compatibility of algorithm configurations.
   * @param initializeAlgorithmMicroserviceDto The DTO containing the algorithm configurations.
   * @returns A promise representing the incompatible component sets.
   */
  abstract checkKafkaCompactibility(configuration: ConfigurationDatabaseDto): Promise<any[]>

}

