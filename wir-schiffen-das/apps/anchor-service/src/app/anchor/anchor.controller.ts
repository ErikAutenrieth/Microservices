import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CheckConfigurationDto,
  CreateAlgorithmStateDto,
  InitializeAlgorithmMicroserviceDto,
  DevMicroserviceAddressEnum,
  ProdMicroserviceAddressEnum,
  ConfigurationValidationInitDto,
} from '@wir-schiffen-das/types';
import { AnchorService } from './anchor.service';
import { ClientKafka } from '@nestjs/microservices';


@Controller('anchor')
export class AnchorController {

  apiUrls = process.env.production ? ProdMicroserviceAddressEnum : DevMicroserviceAddressEnum;
  constructor(private readonly appService: AnchorService,
    @Inject('ANCHOR_SERVICE') private readonly kafkaClient: ClientKafka,
  ) { }


  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  @Get('sendKafka')
  async sendKafka() {
    this.kafkaClient.emit('test', 'Hello Kafka from Anchor GET');
    return 'Message sent';
  }

  /**
   * Handles the POST request for checking configuration.
   *
   * @param CheckConfigurationDto - The data object containing the configuration to be checked.
   * @returns A response indicating the success of the operation.
   */
  @Post('CheckConfiguration')
  @UsePipes(new ValidationPipe())
  async OptEquip(@Body() CheckConfigurationDto: CheckConfigurationDto) {
    const algorithmStateDto: CreateAlgorithmStateDto = {
      userId: CheckConfigurationDto.userID,
      configuration: CheckConfigurationDto,
    };

    const algotithmStateDoc = await this.appService.create(algorithmStateDto);

    // Create a microservice DTO with the algorithm state document's ID
    const microServiceDto: InitializeAlgorithmMicroserviceDto = {
      ...algorithmStateDto,
      ...{ dbId: algotithmStateDoc._id.toString() },
    };

    const kafkaInitMessage: ConfigurationValidationInitDto = {
      userId: CheckConfigurationDto.userID,
      dbId: algotithmStateDoc._id.toString(),
      creationDate: algotithmStateDoc.created,
    }

    await this.appService.publishConfigurationToKafka(kafkaInitMessage);
    console.log('finished sending configuration to kafka');

    /*
    // Send the configuration to all microservices
    for (const microserviceAddressEnum in this.apiUrls) {
      //TODO implement circuit breaker and return success to client
      const res = await this.appService.sendConfigurationToService(
        microServiceDto,
        this.apiUrls[microserviceAddressEnum]
      );
      // console.log('finished sending configuration to engine', res);
    }

    */
    return { success: true };
  }
}
