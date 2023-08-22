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
  DevMicroserviceAddressEnum,
  ProdMicroserviceAddressEnum,
  ConfigurationValidationInitDto,
} from '@wir-schiffen-das/types';
import { AnchorService } from './anchor.service';
import { ClientKafka } from '@nestjs/microservices';


@Controller('anchor')
export class AnchorController {
  // Determine the API URLs based on the environment (production or development)
  apiUrls = process.env.production ? ProdMicroserviceAddressEnum : DevMicroserviceAddressEnum;
  constructor(private readonly appService: AnchorService,
    @Inject('ANCHOR_SERVICE') private readonly kafkaClient: ClientKafka
  ) { }

  // Connect to Kafka when the module is initialized
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
    // Create an algorithm state DTO from the received CheckConfigurationDto
    const algorithmStateDto: CreateAlgorithmStateDto = {
      userId: CheckConfigurationDto.userID,
      configuration: CheckConfigurationDto,
    };
    // Create the algorithm state document in the database
    const algotithmStateDoc = await this.appService.create(algorithmStateDto);

    // Create a Kafka message initialization object
    const kafkaInitMessage: ConfigurationValidationInitDto = {
      userId: CheckConfigurationDto.userID,
      dbId: algotithmStateDoc._id.toString(),
      creationDate: algotithmStateDoc.created,
    }
    // Publish the configuration validation initialization message to Kafka
    await this.appService.publishConfigurationToKafka(kafkaInitMessage);
    console.log('finished sending configuration to kafka');
    return { success: true };
  }
}
