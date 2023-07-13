import { Controller, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { AppService } from './app.service';
import { AbstractAppController } from '@wir-schiffen-das/nestjs-types';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller("engine")
export class AppController extends AbstractAppController implements OnApplicationBootstrap {

  constructor(appService: AppService, @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka) {
    super(appService);
    this.Algorithm = "engine";
  }

  
  async onApplicationBootstrap() {
    // this.kafkaClient.subscribe('new_config_request');
    // await this.kafkaClient.connect();
  }

  @MessagePattern('new_config_request')
  async handleNewConfigRequest(@Payload() message: any) {
    // Handle the incoming message
    console.log('Received new config request:', message.value);
  }



}




