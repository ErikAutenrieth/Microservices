import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';
import { InjectModel } from '@nestjs/mongoose';
import {
  AlgorithmState,
  AlgorithmStateDocument,
  BaseDatabaseServer,
} from '@wir-schiffen-das/nestjs-types';
import {
  CreateAlgorithmStateDto,
  InitializeAlgorithmMicroserviceDto,
  DevMicroserviceAddressEnum,
  ConfigurationValidationInitDto,
} from '@wir-schiffen-das/types';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AnchorService {
  constructor(

    // @InjectModel(AlgorithmState.name) private algorithmState: Model<AlgorithmStateDocument>,
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

  async create( createAlgorithmStateDto: CreateAlgorithmStateDto): Promise<AlgorithmStateDocument> {
    console.log("start create algorithm state");
    const createdAlgorithmState = await this.baseDatabase.create(
      createAlgorithmStateDto
    );
    return createdAlgorithmState;
  }

  /**
   * Sends the configuration to a specific microservice.
   *
   * @param initializeAlgorithmMicroserviceDto - The data object containing the configuration to be sent.
   * @param microserviceAddressEnum - The enum value representing the address of the microservice.
   * @returns A Promise resolving to the result of the HTTP request.
   */
  async sendConfigurationToService(
    initializeAlgorithmMicroserviceDto: InitializeAlgorithmMicroserviceDto,
    devMicroserviceAddressEnum: DevMicroserviceAddressEnum
  ): Promise<any> {
    return await firstValueFrom(
      this.httpService.post(
        devMicroserviceAddressEnum + 'CheckConfiguration',
        initializeAlgorithmMicroserviceDto
      )
    );
    // const apiCall = async () => await firstValueFrom(this.httpService.post( microserviceAddressEnum + "CheckConfiguration", initializeAlgorithmMicroserviceDto ));

    // const breaker = new CircuitBreaker(apiCall, this.circuitBreakerOptions);
    // breaker.fire()
    //   .then(console.log)
    //  .catch(console.error);
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
