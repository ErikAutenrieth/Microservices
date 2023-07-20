import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AbstractAppService, BaseDatabaseServer } from '@wir-schiffen-das/nestjs-types';
import { InitializeAlgorithmMicroserviceDto, ConfigurationDatabaseDto, CheckAlgorithmStateDto, ReturnAlgorithmStateDto, ProdMicroserviceAddressEnum, DevMicroserviceAddressEnum, UpdateKafkaAlgorithmStateDto } from '@wir-schiffen-das/types';
import { Observable, Subject, filter, firstValueFrom, groupBy, map, mergeMap, tap, toArray } from 'rxjs';
import { Kafka } from 'kafkajs';

// TODO make a new inheritance for the service only using the database
@Injectable()
export class AppService implements OnModuleInit {
  apiUrls = process.env.production ? ProdMicroserviceAddressEnum : DevMicroserviceAddressEnum;

  private kafkaClient: Kafka;
  private kafkaSubject: Subject<UpdateKafkaAlgorithmStateDto> = new Subject();
  
  constructor(
    private readonly baseDatabase: BaseDatabaseServer,
    private readonly httpService: HttpService,
  ) { }
  async onModuleInit() {
    this.kafkaClient = new Kafka({
      // clientId: 'my-app',
      brokers: ['localhost:9092'],
    });

    console.log("kafkaClient init");
    const kafkaConsumer =  this.kafkaClient.consumer({ groupId: 'wir-schiffen-das' });
    await kafkaConsumer.connect();

    await kafkaConsumer.subscribe({ topic: RegExp('config_update.*'), fromBeginning: true });

    await kafkaConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(topic);
        const updatemessage: UpdateKafkaAlgorithmStateDto = JSON.parse(message.value.toString());
        this.kafkaSubject.next(updatemessage);
      }
    });
  
  }

  public getKafkaObservable(userId: string) : Observable<any> {

    return this.kafkaSubject.pipe(
      // filter the messages by userId
      filter((message) => message.userId === userId)
    );


  }

  async getRESTAlgorithmStateForUser(algorithm: string, checkStatus: CheckAlgorithmStateDto): Promise<any> {

    return await firstValueFrom(
      this.httpService.post(
        this.apiUrls[algorithm] + 'Status',
        checkStatus
      )
    );
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
