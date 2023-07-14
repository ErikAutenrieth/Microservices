import { Controller, Inject, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { AbstractAppController } from '@wir-schiffen-das/nestjs-types';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { ConfigurationValidationInitDto } from '@wir-schiffen-das/types';

@Controller("engine")
export class AppController extends AbstractAppController {

  constructor(appService: AppService, @Inject('KAFKA_SERVICE') kafkaClient: ClientKafka) {
    super(appService, kafkaClient);
    this.Algorithm = "engine";
  }

}




