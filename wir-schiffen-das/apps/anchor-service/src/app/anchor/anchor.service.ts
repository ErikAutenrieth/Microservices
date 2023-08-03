import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  AlgorithmStateDocument,
  BaseDatabaseServer,
} from '@wir-schiffen-das/nestjs-types';
import {CreateAlgorithmStateDto, ConfigurationValidationInitDto,} from '@wir-schiffen-das/types';


@Injectable()
export class AnchorService {
  constructor(
    @Inject('ANCHOR_SERVICE') private readonly kafkaClient: ClientKafka,
    private baseDatabase: BaseDatabaseServer,
    private httpService: HttpService
  ) { }

  // Circuit breaker options for HTTP requests
  circuitBreakerOptions = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 5000,
  };

  async create(createAlgorithmStateDto: CreateAlgorithmStateDto): Promise<AlgorithmStateDocument> {
    console.log("start create algorithm state");
    const createdAlgorithmState = await this.baseDatabase.create(
      createAlgorithmStateDto
    );
    return createdAlgorithmState;
  }

  /**
   * Sends the configuration to a specific microservice.
   *
   * @param initializeKafkaConfigurationDto - The data object containing the configuration to be sent.
   */
  async publishConfigurationToKafka(
    initializeKafkaConfigurationDto: ConfigurationValidationInitDto) {
    const message = {
      key: initializeKafkaConfigurationDto.userId,
      value: JSON.stringify(initializeKafkaConfigurationDto),
    };
    await this.kafkaClient.connect();

    this.kafkaClient.emit('new_config_request', message);
  }

}
